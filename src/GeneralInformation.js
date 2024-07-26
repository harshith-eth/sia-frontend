import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Textarea, Button, Flex } from '@chakra-ui/react';

const GeneralInformation = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const [visaStatus, setVisaStatus] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleGenerateDescription = () => {
    // This is where you will handle the description generation with AI
    // For now, let's simulate it with a simple expansion of the existing fields
    setDescription(`Job Title: ${jobTitle}\nDepartment: ${department}\nSalary: ${salary}\nVisa Status: ${visaStatus}\nLocation: ${location}\n\nDescription: This is an expanded description based on the provided details.`);
  };

  return (
    <Box className="content" p={5}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2">General Information</Heading>
        <Button onClick={handleGenerateDescription} colorScheme="teal">
          ✨ Expand with AI
        </Button>
      </Flex>
      <FormControl mb={4}>
        <FormLabel>Job Title</FormLabel>
        <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Job Title" />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Department</FormLabel>
        <Input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Salary</FormLabel>
        <Input value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Salary" />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Visa Status</FormLabel>
        <Input value={visaStatus} onChange={(e) => setVisaStatus(e.target.value)} placeholder="Visa Status" />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Remote/In-Person</FormLabel>
        <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Remote/In-Person" />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Description</FormLabel>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Job Description" />
      </FormControl>
    </Box>
  );
};

export default GeneralInformation;
