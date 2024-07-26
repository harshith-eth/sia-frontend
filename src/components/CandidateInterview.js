import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, IconButton, Text, HStack, Button, VStack, useColorModeValue, Menu, MenuButton, MenuList, MenuItem, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash, FaChevronUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Webcam from 'react-webcam';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

const CandidateInterview = () => {
  const [stream, setStream] = useState(null);
  const [micEnabled, setMicEnabled] = useState(true);
  const [camEnabled, setCamEnabled] = useState(true);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioDevices, setAudioDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState('');
  const [selectedVideoDevice, setSelectedVideoDevice] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const recognizerRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const lastRecognizedText = useRef('');
  const recognitionTimeout = useRef(null);
  const [isEndCallDialogOpen, setIsEndCallDialogOpen] = useState(false);
  const cancelRef = useRef();

  const userVideo = useRef();
  const ws = useRef(null);

  const connectWebSocket = () => {
    ws.current = new WebSocket('ws://localhost:80/');
    ws.current.onopen = () => console.log('WebSocket connected');
    ws.current.onmessage = (message) => {
      console.log('Raw message:', message);
      try {
        const data = JSON.parse(message.data);
        if (data.type === 'interviewResponse') {
          setMessages(prev => [...prev, { from: 'SIA', text: data.message }]);
          setConversationHistory(prev => [...prev, { role: 'assistant', content: data.message }]);
          textToSpeech(data.message);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    ws.current.onerror = (error) => console.error('WebSocket error:', error);
    ws.current.onclose = () => {
      console.log('WebSocket closed. Reconnecting...');
      setTimeout(connectWebSocket, 3000);
    };
  };

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const audio = devices.filter(device => device.kind === 'audioinput');
      const video = devices.filter(device => device.kind === 'videoinput');
      setAudioDevices(audio);
      setVideoDevices(video);
    });

    getUserMedia();
    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
      if (recognizerRef.current) {
        recognizerRef.current.close();
      }
    };
  }, [selectedAudioDevice, selectedVideoDevice]);

  const getUserMedia = () => {
    navigator.mediaDevices.getUserMedia({
      video: { deviceId: selectedVideoDevice ? { exact: selectedVideoDevice } : undefined },
      audio: { deviceId: selectedAudioDevice ? { exact: selectedAudioDevice } : undefined }
    }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
        userVideo.current.muted = true; // Mute the video element to prevent echo
      }
    }).catch(error => {
      console.error('Error accessing media devices:', error);
    });
  };

  const toggleMic = () => {
    setMicEnabled(prev => !prev);
    if (stream) {
      stream.getAudioTracks()[0].enabled = !micEnabled;
    }
  };

  const toggleCam = () => {
    setCamEnabled(prev => !prev);
    if (stream) {
      stream.getVideoTracks()[0].enabled = !camEnabled;
    }
  };

  const startInterview = () => {
    if (!isInterviewStarted && ws.current) {
      console.log('Starting interview');
      setIsInterviewStarted(true);
      ws.current.send(JSON.stringify({ type: 'startInterview' }));

      const welcomeMessage = "Hey, I am SIA. This will be a short intro call with you to get to know about yourself. Be free and relax. I understand that this might be new to you - conversing with AI - but I really hope to understand you and share your story with the hiring team. Let's make this an enjoyable experience!";

      typeMessage(welcomeMessage, (typedMessage) => {
        setCurrentMessage(typedMessage);
        if (typedMessage === welcomeMessage) {
          setMessages(prev => [...prev, { from: 'SIA', text: welcomeMessage }]);
          setCurrentMessage('');
        }
      });

      setConversationHistory([{ role: 'assistant', content: welcomeMessage }]);
      textToSpeech(welcomeMessage);
      continuousSpeechToText();
    }
  };

  const endCall = () => {
    setIsEndCallDialogOpen(true);
  };

  const handleEndInterview = () => {
    setIsEndCallDialogOpen(false);
    console.log('Ending interview');
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (ws.current) {
      ws.current.close();
    }
    if (recognizerRef.current) {
      recognizerRef.current.close();
    }
  
    // Stop the TTS
    if (recognizerRef.current) {
      recognizerRef.current.stopContinuousRecognitionAsync();
    }
  
    // Clear the current message being typed
    setCurrentMessage('');
  
    setIsInterviewStarted(false);
  };

  const textToSpeech = (text) => {
    if (recognizerRef.current) {
      recognizerRef.current.stopContinuousRecognitionAsync();
    }

    setIsSpeaking(true);
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(process.env.REACT_APP_AZURE_SPEECH_KEY, process.env.REACT_APP_AZURE_SPEECH_REGION);
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.speakTextAsync(text,
      result => {
        if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
          console.log("TTS: Synthesis finished.");
        } else {
          console.error("TTS: Speech synthesis canceled, " + result.errorDetails);
        }
        synthesizer.close();
        setIsSpeaking(false);
        setIsProcessing(false);
        if (recognizerRef.current) {
          recognizerRef.current.startContinuousRecognitionAsync();
        }
      },
      error => {
        console.error("TTS: Error synthesizing speech: " + error);
        synthesizer.close();
        setIsSpeaking(false);
        setIsProcessing(false);
        if (recognizerRef.current) {
          recognizerRef.current.startContinuousRecognitionAsync();
        }
      });
  };

  const continuousSpeechToText = () => {
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(process.env.REACT_APP_AZURE_SPEECH_KEY, process.env.REACT_APP_AZURE_SPEECH_REGION);
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    recognizerRef.current = recognizer;

    recognizer.recognizing = (s, e) => {
      console.log(`STT: Recognizing: ${e.result.text}`);
    };

    recognizer.recognized = (s, e) => {
      if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
        console.log(`STT: Recognized: ${e.result.text}`);
        const currentText = e.result.text.trim();

        if (currentText !== lastRecognizedText.current && currentText !== '') {
          clearTimeout(recognitionTimeout.current);

          recognitionTimeout.current = setTimeout(() => {
            setMessages(prev => [...prev, { from: 'User', text: currentText }]);
            if (!isProcessing) {
              setIsProcessing(true);
              console.log("Sending recognition");
              ws.current.send(JSON.stringify({ type: 'interviewQuestion', question: currentText, history: conversationHistory }));
              setConversationHistory(prev => [...prev, { role: 'user', content: currentText }]);
            }
            lastRecognizedText.current = currentText;
          }, 1000); // Wait for 1 second before processing
        }
      } else if (e.result.reason === SpeechSDK.ResultReason.NoMatch) {
        console.log("STT: No speech could be recognized.");
      }
    };

    recognizer.canceled = (s, e) => {
      console.error(`STT Canceled. Reason: ${e.reason}`, e.errorDetails);
      recognizer.stopContinuousRecognitionAsync();
    };

    recognizer.sessionStopped = (s, e) => {
      console.log("STT: Session stopped.");
      recognizer.stopContinuousRecognitionAsync();
    };

    recognizer.startContinuousRecognitionAsync();
  };

  const typeMessage = (message, callback) => {
    let index = 0;
    const typingSpeed = 40;

    const type = () => {
      if (index < message.length) {
        callback(message.slice(0, index + 1));
        index++;
        setTimeout(type, typingSpeed);
      }
    };

    type();
  };

  const bgColor = useColorModeValue('gray.800', 'gray.800');
  const videoBgColor = useColorModeValue('gray.700', 'gray.700');

  return (
    <Box p={2} width="100vw" height="100vh" bg={bgColor}>
      <Flex direction="column" align="center" justify="space-between" height="100%" gap={5}>
        <Flex direction="row" align="center" justify="center" height="80%" gap={5} width="100%">
          <Box
            width="20%"
            height="60%"
            bg={videoBgColor}
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            position="relative"
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="100%"
              height="100%"
              p={2}
              bg="transparent"
              borderRadius="md"
              className={isSpeaking ? 'glow' : ''}
            >
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={isSpeaking ? { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] } : { scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(85, 85, 255, 1) 0%, rgba(85, 85, 255, 0) 70%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text fontSize="4xl" fontWeight="bold" color="white">SIA</Text>
              </motion.div>
            </Flex>
          </Box>
          <Box
            width="46%"
            height="79%"
            bg={videoBgColor}
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
          >
            <Webcam audio={false} ref={userVideo} style={{ width: '100%', height: '100%', transform: 'scaleX(-1)' }} />
          </Box>
          <Box
            width="30%"
            height="79%"
            bg={videoBgColor}
            borderRadius="md"
            display="flex"
            flexDirection="column"
            overflowY="auto"
            p={3}
          >
            <Text fontSize="lg" fontWeight="bold" mb={2}>Chat</Text>
            <VStack spacing={3} align="stretch">
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  bg={msg.from === 'SIA' ? 'blue.500' : 'gray.500'}
                  color="white"
                  p={2}
                  borderRadius="md"
                  alignSelf={msg.from === 'SIA' ? 'flex-start' : 'flex-end'}
                >
                  <Text>{msg.text}</Text>
                </Box>
              ))}
              {currentMessage && (
                <Box
                  bg='blue.500'
                  color="white"
                  p={2}
                  borderRadius="md"
                  alignSelf='flex-start'
                >
                  <Text>{currentMessage}</Text>
                </Box>
              )}
            </VStack>
          </Box>
        </Flex>
        <HStack spacing={4} mb={4}>
          <Menu>
            <MenuButton as={IconButton} icon={<FaChevronUp />}>
              Microphone
            </MenuButton>
            <MenuList>
              {audioDevices.map((device, index) => (
                <MenuItem key={index} onClick={() => setSelectedAudioDevice(device.deviceId)}>
                  {selectedAudioDevice === device.deviceId ? <b>{device.label || `Microphone ${index + 1}`}</b> : device.label || `Microphone ${index + 1}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <IconButton icon={micEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />} onClick={toggleMic} />
          <Menu>
            <MenuButton as={IconButton} icon={<FaChevronUp />}>
              Camera
            </MenuButton>
            <MenuList>
              {videoDevices.map((device, index) => (
                <MenuItem key={index} onClick={() => setSelectedVideoDevice(device.deviceId)}>
                  {selectedVideoDevice === device.deviceId ? <b>{device.label || `Camera ${index + 1}`}</b> : device.label || `Camera ${index + 1}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <IconButton icon={camEnabled ? <FaVideo /> : <FaVideoSlash />} onClick={toggleCam} />
          <Text color="white">Timer: 00:00</Text>
          <Button colorScheme="blue" onClick={startInterview}>Start Interview</Button>
          <IconButton icon={<FaPhoneSlash />} colorScheme="red" onClick={endCall} />
        </HStack>
      </Flex>
      <AlertDialog
        isOpen={isEndCallDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsEndCallDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              End Interview
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to end the interview?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsEndCallDialogOpen(false)}>
                Continue Interview
              </Button>
              <Button colorScheme="red" onClick={handleEndInterview} ml={3}>
                End Interview
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default CandidateInterview;
