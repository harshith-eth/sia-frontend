import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, useColorModeValue, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from '@chakra-ui/react';
import VideoSection from './VideoSection';
import Chatbot from './Chatbot';
import InterviewControls from './InterviewControls';
import { useTTS } from './TTS';
import { useSTT } from './STT';
import useWebSocketCommunication from './WebSocketCommunication';

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEndCallDialogOpen, setIsEndCallDialogOpen] = useState(false);
  
  const userVideo = useRef();
  const cancelRef = useRef();
  
  const { textToSpeech } = useTTS();
  const { continuousSpeechToText, stopListening } = useSTT();
  const { sendMessage, lastMessage } = useWebSocketCommunication('ws://localhost:80/');

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const audio = devices.filter(device => device.kind === 'audioinput');
      const video = devices.filter(device => device.kind === 'videoinput');
      setAudioDevices(audio);
      setVideoDevices(video);
    });

    getUserMedia();
  }, [selectedAudioDevice, selectedVideoDevice]);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage);
      if (data.type === 'interviewResponse') {
        setMessages(prev => [...prev, { from: 'SIA', text: data.message }]);
        setConversationHistory(prev => [...prev, { role: 'assistant', content: data.message }]);
        textToSpeech(data.message);
      }
    }
  }, [lastMessage]);

  const getUserMedia = () => {
    navigator.mediaDevices.getUserMedia({
      video: { deviceId: selectedVideoDevice ? { exact: selectedVideoDevice } : undefined },
      audio: { deviceId: selectedAudioDevice ? { exact: selectedAudioDevice } : undefined }
    }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
        userVideo.current.muted = true;
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

  const handleRecognizedSpeech = (text) => {
    setMessages(prev => [...prev, { from: 'User', text }]);
    setConversationHistory(prev => [...prev, { role: 'user', content: text }]);
    sendMessage(JSON.stringify({ type: 'interviewQuestion', question: text, history: conversationHistory }));
  };

  const startInterview = () => {
    if (!isInterviewStarted) {
      setIsInterviewStarted(true);
      sendMessage(JSON.stringify({ type: 'startInterview' }));

      const welcomeMessage = "Hey, I am Sia - Smart Interview Assistant. This will be a short intro call with you to get to know about yourself. Be free and relax. I understand that this might be new to you - conversing with AI - but I really hope to understand you and share your story with the hiring team. Let's make this an enjoyable experience!";

      setMessages(prev => [...prev, { from: 'SIA', text: welcomeMessage }]);
      setConversationHistory([{ role: 'assistant', content: welcomeMessage }]);
      textToSpeech(welcomeMessage);
      continuousSpeechToText(handleRecognizedSpeech);
    }
  };

  const endCall = () => {
    setIsEndCallDialogOpen(true);
  };

  const handleEndInterview = () => {
    setIsEndCallDialogOpen(false);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    stopListening();
    setIsInterviewStarted(false);
  };

  const bgColor = useColorModeValue('gray.800', 'gray.800');

  return (
    <Box p={2} width="100vw" height="100vh" bg={bgColor}>
      <Flex direction="column" align="center" justify="space-between" height="100%" gap={5}>
        <Flex direction="row" align="center" justify="center" height="80%" gap={5} width="100%">
          <VideoSection
            userVideo={userVideo}
            isSpeaking={isSpeaking}
          />
          <Chatbot
            messages={messages}
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            sendMessage={sendMessage}
            conversationHistory={conversationHistory}
          />
        </Flex>
        <InterviewControls
          micEnabled={micEnabled}
          camEnabled={camEnabled}
          toggleMic={toggleMic}
          toggleCam={toggleCam}
          startInterview={startInterview}
          endCall={endCall}
          audioDevices={audioDevices}
          videoDevices={videoDevices}
          setSelectedAudioDevice={setSelectedAudioDevice}
          setSelectedVideoDevice={setSelectedVideoDevice}
          isInterviewStarted={isInterviewStarted}
        />
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