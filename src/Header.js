// Header.js
import React from 'react';
import { Box, Flex, IconButton, Avatar, Input } from '@chakra-ui/react';
import { FaBell, FaQuestionCircle } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import './App.css';

const Header = () => {
  return (
    <Box className="header">
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        <Flex alignItems="center" flex="1" justifyContent="center">
          <Flex alignItems="center" width="50%">
            <FiSearch size={24} color="gray.500" />
            <Input
              placeholder="Search here..."
              variant="unstyled"
              ml={2}
              color="gray.500"
            />
          </Flex>
        </Flex>
        <Flex alignItems="center">
          <IconButton aria-label="Notifications" icon={<FaBell />} mr={2} />
          <IconButton aria-label="Help/Chat" icon={<FaQuestionCircle />} mr={2} />
          <Avatar size="sm" name="User Name" src="path-to-profile-image.jpg" /> {/* Replace with dynamic image source */}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;