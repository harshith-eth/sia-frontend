import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Select,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
} from '@chakra-ui/react';

const Reports = () => {
  const [reportType, setReportType] = useState('');
  const [generatedReport, setGeneratedReport] = useState(null);

  const handleGenerateReport = () => {
    // Logic to generate report based on selected type
    // This is just a mock implementation
    const report = {
      type: reportType,
      data: [
        { metric: 'Diversity', value: '40% women' },
        { metric: 'Time to Hire', value: '21 days' },
        // Add more mock data as needed
      ],
    };
    setGeneratedReport(report);
  };

  return (
    <Box className="content" p={5}>
      <Heading as="h1" mb={4}>Reports</Heading>
      <Text mb={8}>View your reports here.</Text>

      <VStack spacing={5} align="stretch">
        <Box>
          <Heading size="md" mb={3}>Report Builder</Heading>
          <HStack spacing={3}>
            <Select placeholder="Select report type" onChange={(e) => setReportType(e.target.value)}>
              <option value="diversity">Diversity Metrics</option>
              <option value="time-to-hire">Time to Hire</option>
              <option value="hiring-funnel">Hiring Funnel Analysis</option>
              {/* Add more options as needed */}
            </Select>
            <Button onClick={handleGenerateReport} colorScheme="teal">Generate Report</Button>
          </HStack>
        </Box>

        {generatedReport && (
          <Box>
            <Heading size="md" mb={3}>Generated Report</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Metric</Th>
                  <Th>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                {generatedReport.data.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.metric}</Td>
                    <Td>{item.value}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <HStack mt={4} spacing={3}>
              <Button colorScheme="blue">Export as PDF</Button>
              <Button colorScheme="blue">Export as Excel</Button>
            </HStack>
          </Box>
        )}

        <Box>
          <Heading size="md" mb={3}>Predefined Reports</Heading>
          <VStack align="stretch">
            <Button>View Diversity Metrics Report</Button>
            <Button>View Hiring Funnel Analysis Report</Button>
            <Button>View Time to Hire Report</Button>
            {/* Add more predefined reports as needed */}
          </VStack>
        </Box>

        <Box>
          <Heading size="md" mb={3}>Scheduled Reports</Heading>
          <HStack spacing={3}>
            <Input placeholder="Enter email" />
            <Select placeholder="Select interval">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Select>
            <Button colorScheme="teal">Schedule Report</Button>
          </HStack>
        </Box>

        <Box>
          <Heading size="md" mb={3}>Report Analytics</Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Report</Th>
                <Th>Views</Th>
                <Th>Last Accessed</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Diversity Metrics</Td>
                <Td>120</Td>
                <Td>2024-06-24</Td>
              </Tr>
              <Tr>
                <Td>Hiring Funnel Analysis</Td>
                <Td>90</Td>
                <Td>2024-06-23</Td>
              </Tr>
              {/* Add more report analytics as needed */}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
};

export default Reports;
