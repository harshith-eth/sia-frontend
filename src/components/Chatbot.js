import React, { useRef, useEffect } from 'react';
import { Box, Flex, Text, VStack, HStack, Input, IconButton } from '@chakra-ui/react';
import { FaPaperPlane, FaFileUpload } from 'react-icons/fa';

const Chatbot = ({ messages, currentMessage, setCurrentMessage, sendMessage, conversationHistory }) => {
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, currentMessage]);

  const handleSendMessage = () => {
    if (currentMessage.trim() !== '') {
      sendMessage(JSON.stringify({ type: 'interviewQuestion', question: currentMessage.trim(), history: conversationHistory }));
      setCurrentMessage('');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64File = reader.result.split(',')[1];
        sendMessage(JSON.stringify({ type: 'fileUpload', fileName: file.name, fileContent: base64File }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Flex
      direction="column"
      width="30%"
      height="79%"
      bg="gray.700"
      borderRadius="md"
      p={3}
    >
      <Text fontSize="lg" fontWeight="bold" mb={2} position="sticky" top={0} bg="gray.700" zIndex={1}>Chat</Text>
      <VStack spacing={3} align="stretch" overflowY="auto" ref={chatBoxRef} flex="1">
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
      </VStack>
      <HStack spacing={2} mt={2}>
        <Input
          placeholder="Type your message here..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          color="white"
        />
        <IconButton icon={<FaPaperPlane />} onClick={handleSendMessage} colorScheme="blue" />
        <IconButton as="label" icon={<FaFileUpload />} colorScheme="blue">
          <input type="file" accept="application/pdf" hidden onChange={handleFileUpload} />
        </IconButton>
      </HStack>
    </Flex>
  );
};

export default Chatbot;