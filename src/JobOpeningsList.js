import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const JobOpeningsList = ({ jobs }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Job Title</Th>
          <Th>Location</Th>
          <Th>Salary</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {jobs.map((job) => (
          <Tr key={job.id}>
            <Td>{job.title}</Td>
            <Td>{job.location}</Td>
            <Td>{job.salary}</Td>
            <Td>
              <Button as={Link} to={`/ai-interviews/edit-job/${job.id}`} colorScheme="teal" size="sm" mr={2}>
                Edit
              </Button>
              <Button colorScheme="red" size="sm">Delete</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default JobOpeningsList;
