import React from 'react';
import { HStack, IconButton, Text, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash, FaChevronUp } from 'react-icons/fa';

const InterviewControls = ({
  micEnabled,
  camEnabled,
  toggleMic,
  toggleCam,
  startInterview,
  endCall,
  audioDevices,
  videoDevices,
  setSelectedAudioDevice,
  setSelectedVideoDevice
}) => {
  return (
    <HStack spacing={4} mb={4}>
      <Menu>
        <MenuButton as={IconButton} icon={<FaChevronUp />}>
          Microphone
        </MenuButton>
        <MenuList>
          {audioDevices.map((device, index) => (
            <MenuItem key={index} onClick={() => setSelectedAudioDevice(device.deviceId)}>
              {device.label || `Microphone ${index + 1}`}
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
              {device.label || `Camera ${index + 1}`}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <IconButton icon={camEnabled ? <FaVideo /> : <FaVideoSlash />} onClick={toggleCam} />
      <Text color="white">Timer: 00:00</Text>
      <Button colorScheme="blue" onClick={startInterview}>Start Interview</Button>
      <IconButton icon={<FaPhoneSlash />} colorScheme="red" onClick={endCall} />
    </HStack>
  );
};

export default InterviewControls;