import React from 'react';
import { Box, Flex, HStack, IconButton, useColorModeValue } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Layout component which includes navigation and children content
const Layout = ({ children }) => {
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      {/* Navigation bar */}
      <Flex as="nav" bg={useColorModeValue('white', 'gray.800')} px={4} py={2} shadow="md">
        <HStack spacing={8} alignItems="center">
          {/* Menu icon button */}
          <IconButton size="md" icon={<FiMenu />} aria-label="Open Menu" />
          {/* Navigation links */}
          <HStack as="nav" spacing={4}>
            <Link to="/">Dashboard</Link>
            <Link to="/ai-interview">AI Interview</Link>
          </HStack>
        </HStack>
      </Flex>
      {/* Main content */}
      <Box p={4}>{children}</Box>
    </Box>
  );
};

export default Layout;
