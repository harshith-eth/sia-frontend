// Dashboard.js
import React from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Flex,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Button,
  VStack,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { Line, Bar } from 'react-chartjs-2';
import {
  BellIcon,
  SettingsIcon,
  RepeatIcon,
  AddIcon,
} from '@chakra-ui/icons';
import 'chart.js/auto';

const interviewData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Candidates Interviewed',
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
    },
  ],
};

const Dashboard = () => {
  const toast = useToast();

  const handleSavePreferences = () => {
    toast({
      title: 'Preferences Saved',
      description: 'Your preferences have been saved successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box className="content" p={5} bg="gray.800">
      <Flex align="center" mb={5}>
        <Heading as="h1">Dashboard</Heading>
        <Spacer />
        <IconButton
          icon={<SettingsIcon />}
          onClick={handleSavePreferences}
          aria-label="Save Preferences"
        />
        <Button colorScheme="teal" leftIcon={<BellIcon />} ml={3}>
          Alerts
        </Button>
      </Flex>

      <Text mb={8}>Welcome to the dashboard!</Text>

      <SimpleGrid columns={[1, 2, 3]} spacing={5} mb={5}>
        <GridItem>
          <Box className="card" p={4} borderRadius="md" bg="gray.700">
            <Stat>
              <StatLabel>Total Candidates Interviewed</StatLabel>
              <StatNumber>345</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </Box>
        </GridItem>

        <GridItem>
          <Box className="card" p={4} borderRadius="md" bg="gray.700">
            <Stat>
              <StatLabel>Successful Hires</StatLabel>
              <StatNumber>45</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                5.12%
              </StatHelpText>
            </Stat>
          </Box>
        </GridItem>

        <GridItem>
          <Box className="card" p={4} borderRadius="md" bg="gray.700">
            <Stat>
              <StatLabel>Interview Completion Rate</StatLabel>
              <StatNumber>85%</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                12%
              </StatHelpText>
            </Stat>
          </Box>
        </GridItem>

        <GridItem>
          <Box className="card" p={4} borderRadius="md" bg="gray.700">
            <Stat>
              <StatLabel>Time to Hire</StatLabel>
              <StatNumber>21 days</StatNumber>
            </Stat>
          </Box>
        </GridItem>

        <GridItem>
          <Box className="card" p={4} borderRadius="md" bg="gray.700">
            <Stat>
              <StatLabel>Open Positions</StatLabel>
              <StatNumber>12</StatNumber>
            </Stat>
          </Box>
        </GridItem>

        <GridItem>
          <Box className="card" p={4} borderRadius="md" bg="gray.700">
            <Stat>
              <StatLabel>Average Interview Scores</StatLabel>
              <StatNumber>4.2/5</StatNumber>
            </Stat>
          </Box>
        </GridItem>
      </SimpleGrid>

      <Box p={4} borderRadius="md" bg="gray.700" mb={5}>
        <Heading size="md" mb={3}>Performance Trends</Heading>
        <Box height="300px">
          <Line data={interviewData} options={{ maintainAspectRatio: false }} />
        </Box>
      </Box>

      <Box p={4} borderRadius="md" bg="gray.700" mb={5}>
        <Heading size="md" mb={3}>Comparison Charts</Heading>
        <Box height="300px">
          <Bar
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  label: 'Current Period',
                  data: [65, 59, 80, 81, 56, 55],
                  backgroundColor: 'rgba(54, 162, 235, 0.6)',
                },
                {
                  label: 'Previous Period',
                  data: [50, 60, 70, 91, 50, 60],
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
              ],
            }}
            options={{ maintainAspectRatio: false }}
          />
        </Box>
      </Box>

      <Box p={4} borderRadius="md" bg="gray.700" mb={5}>
        <Flex justify="space-between" align="center">
          <Heading size="md">Top Candidates</Heading>
          <Button colorScheme="teal">View All</Button>
        </Flex>
        <VStack spacing={3} mt={3}>
          <Box className="card" p={4} borderRadius="md" w="full" bg="gray.600">
            <Flex justify="space-between">
              <Text>John Doe</Text>
              <Text>Score: 4.8/5</Text>
            </Flex>
          </Box>
          <Box className="card" p={4} borderRadius="md" w="full" bg="gray.600">
            <Flex justify="space-between">
              <Text>Jane Smith</Text>
              <Text>Score: 4.7/5</Text>
            </Flex>
          </Box>
          <Box className="card" p={4} borderRadius="md" w="full" bg="gray.600">
            <Flex justify="space-between">
              <Text>Robert Brown</Text>
              <Text>Score: 4.6/5</Text>
            </Flex>
          </Box>
        </VStack>
      </Box>

      <Box p={4} borderRadius="md" bg="gray.700" mb={5}>
        <Heading size="md" mb={3}>Activity Feed</Heading>
        <Text mb={2}>John Doe scheduled an interview with Jane Smith.</Text>
        <Text mb={2}>Emily Johnson completed an interview with Robert Brown.</Text>
        <Text mb={2}>Michael Lee reviewed the application of David Wilson.</Text>
      </Box>

      <Box p={4} borderRadius="md" bg="gray.700" mb={5}>
        <Flex justify="space-between" align="center">
          <Heading size="md">Real-time Updates</Heading>
          <IconButton
            icon={<RepeatIcon />}
            onClick={() => toast({
              title: 'Real-time Updates',
              description: 'Real-time updates are enabled.',
              status: 'info',
              duration: 3000,
              isClosable: true,
            })}
            aria-label="Enable Real-time Updates"
          />
        </Flex>
      </Box>

      <Box p={4} borderRadius="md" bg="gray.700" mb={5}>
        <Flex justify="space-between" align="center">
          <Heading size="md">Customizable Widgets</Heading>
          <Button colorScheme="teal" leftIcon={<AddIcon />}>Add Widget</Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Dashboard;
