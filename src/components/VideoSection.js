import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Webcam from 'react-webcam';

const VideoSection = ({ userVideo, isSpeaking }) => {
  return (
    <>
      <Box
        width="20%"
        height="60%"
        bg="gray.700"
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
        bg="gray.700"
        borderRadius="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        <Webcam audio={false} ref={userVideo} style={{ width: '100%', height: '100%', transform: 'scaleX(-1)' }} />
      </Box>
    </>
  );
};

export default VideoSection;