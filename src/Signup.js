import React from 'react';
import { Box, Button, Heading, Input, VStack, Text, Link as ChakraLink, HStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import logo from './zavata-logo.png'; // Ensure you have a zavata-logo.png in your src directory

const Signup = () => {
  return (
    <Box className="auth-container" minH="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bg="var(--content-bg)" color="var(--header-text)">
      <HStack spacing={0} position="absolute" top={3} left={15} alignItems="center">
        <img src={logo} alt="logo" className="logo" />
        <Text fontSize="2xl" fontWeight="bold" className="logo-text">Zavata</Text>
      </HStack>
      <Button as={RouterLink} to="/dashboard" position="absolute" top={5} right={5} colorScheme="blue" size="lg">Beta Access</Button>
      <Box bg="var(--card-bg)" p={8} borderRadius="md" boxShadow="lg" w="sm">
        <VStack spacing={4} align="stretch">
          <Heading as="h1" size="lg" textAlign="center" color="var(--card-text)">Sign Up</Heading>
          <Input placeholder="Name" bg="var(--content-bg)" color="var(--card-text)" />
          <Input placeholder="Email" type="email" bg="var(--content-bg)" color="var(--card-text)" />
          <Input placeholder="Password" type="password" bg="var(--content-bg)" color="var(--card-text)" />
          <Button colorScheme="blue" size="lg" w="100%">Sign Up</Button>
          <Text textAlign="center" color="var(--card-text)">or</Text>
          <Button colorScheme="blue" size="lg" w="100%">Sign up with Google</Button>
          <Button colorScheme="blue" size="lg" w="100%">Sign up with Microsoft</Button>
          <Button colorScheme="blue" size="lg" w="100%">Sign up with Apple</Button>
          <Text textAlign="center" color="var(--card-text)">Already have an account? <ChakraLink as={RouterLink} to="/login" color="blue.300" _hover={{ color: "blue.500", textDecoration: "underline" }}>Login</ChakraLink></Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Signup;
