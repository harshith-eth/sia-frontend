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

const Applications = () => {
  return (
    <Box className="content" p={5}>
      <Heading as="h1" mb={4}>Applications</Heading>
      <Text mb={8}>Manage your applications here.</Text>
      <Flex mb={5} justify="space-between" align="center">
        <Input placeholder="Search applications..." maxW="300px" />
        <Flex>
          <Select placeholder="Filter by status" maxW="200px" mr={2}>
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="reviewed">Reviewed</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </Select>
          <Button colorScheme="blue">Apply Filters</Button>
        </Flex>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>List of all applications</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Position</Th>
              <Th>Status</Th>
              <Th>Date Applied</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>John Doe</Td>
              <Td>Software Engineer</Td>
              <Td>In Progress</Td>
              <Td>2024-06-24</Td>
              <Td>
                <Button size="sm" colorScheme="teal" mr={2}>View</Button>
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

export default Applications;
