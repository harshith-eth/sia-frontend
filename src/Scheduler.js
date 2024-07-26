import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Select,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
  {
    id: 0,
    title: 'Interview with John Doe',
    start: new Date(2024, 5, 25, 10, 0, 0),
    end: new Date(2024, 5, 25, 11, 0, 0),
  },
  {
    id: 1,
    title: 'Interview with Jane Smith',
    start: new Date(2024, 5, 26, 13, 0, 0),
    end: new Date(2024, 5, 26, 14, 0, 0),
  },
  // Add more events as needed
];

const Scheduler = () => {
  const [calendarEvents, setCalendarEvents] = useState(events);
  const toast = useToast();

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('New Interview Title');
    if (title) {
      setCalendarEvents([
        ...calendarEvents,
        {
          id: calendarEvents.length,
          start,
          end,
          title,
        },
      ]);
      toast({
        title: "Interview scheduled.",
        description: `Interview titled '${title}' has been scheduled.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const eventStyleGetter = () => ({
    style: {
      backgroundColor: '#2D3748',
      color: '#CBD5E0',
      borderRadius: '4px',
      border: 'none',
    },
  });

  return (
    <Box className="content" p={5} bg={useColorModeValue('gray.50', 'gray.800')} borderRadius="md" boxShadow="md">
      <Heading as="h1" mb={4}>Scheduler</Heading>
      <Text mb={8}>Manage your schedule here.</Text>

      <Box mb={8} p={4} border="1px" borderColor={useColorModeValue('gray.200', 'gray.700')} borderRadius="md" bg={useColorModeValue('white', 'gray.900')}>
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          onSelectSlot={handleSelectSlot}
          eventPropGetter={eventStyleGetter}
        />
      </Box>

      <Flex justify="space-between" align="center" mb={8}>
        <Select placeholder="Filter by interviewer" maxW="200px" variant="filled" bg={useColorModeValue('gray.50', 'gray.700')} borderColor={useColorModeValue('gray.200', 'gray.600')}>
          <option value="john-doe">John Doe</option>
          <option value="jane-smith">Jane Smith</option>
          {/* Add more interviewers as needed */}
        </Select>
        <Button colorScheme="teal" size="md">Apply Filters</Button>
      </Flex>

      <Box p={4} borderRadius="md" bg={useColorModeValue('white', 'gray.900')} border="1px" borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Heading size="md" mb={3}>Scheduling Analytics</Heading>
        <Text>No-show rate: 10%</Text>
        <Text>Rescheduling rate: 5%</Text>
        <Text>Average scheduling time: 2 days</Text>
      </Box>
    </Box>
  );
};

export default Scheduler;
