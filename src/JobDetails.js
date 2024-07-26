// src/JobDetails.js
import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';

const JobDetails = () => {
  const { jobId } = useParams();

  return (
    <Box p={5}>
      <Heading as="h1" mb={4}>Job Details</Heading>
      <Text mb={4}>Details for job ID: {jobId}</Text>
      <Button as={Link} to={`/ai-interviews/${jobId}/kanban`} colorScheme="teal" mb={4}>
        View Kanban Board
      </Button>
      {/* Add more details as needed */}
    </Box>
  );
};

export default JobDetails;
