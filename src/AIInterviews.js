import React from 'react';
import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  Button,
  Flex,
  Select,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const AIInterviews = () => {
  const navigate = useNavigate();

  const handleRowClick = (jobId) => {
    navigate(`/ai-interviews/${jobId}`);
  };

  return (
    <Box className="content" p={5}>
      <Heading as="h1" mb={4}>AI Interviews</Heading>
      <Text mb={8}>Manage your job openings here.</Text>
      <Flex mb={5} justify="space-between" align="center">
        <Input placeholder="Search by name" maxW="300px" />
        <Flex>
          <Select placeholder="Filter by status" maxW="200px" mr={2}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
          <Button colorScheme="blue">Apply Filters</Button>
        </Flex>
      </Flex>
      <Button as={Link} to="/ai-interviews/add-job" colorScheme="teal" mb={4}>
        Add Job Opening
      </Button>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>List of all job openings</TableCaption>
          <Thead>
            <Tr>
              <Th>Job Title</Th>
              <Th>Location</Th>
              <Th>Salary</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr onClick={() => handleRowClick(1)} style={{ cursor: 'pointer' }}> {/* Replace 1 with the actual job ID */}
              <Td>Software Engineer</Td>
              <Td>New York</Td>
              <Td>$100,000</Td>
              <Td>Active</Td>
              <Td>
                <Button size="sm" colorScheme="teal" mr={2}>Edit</Button>
                <Button size="sm" colorScheme="red">Delete</Button>
              </Td>
            </Tr>
            {/* More rows can be added here */}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AIInterviews;
