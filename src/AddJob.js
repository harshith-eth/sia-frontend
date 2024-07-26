import React from 'react';
import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import GeneralInformation from './GeneralInformation';
import InterviewQuestions from './InterviewQuestions';
import InterviewSettings from './InterviewSettings';

const AddJob = () => {
  return (
    <Box className="content" p={5}>
      <Heading as="h1" mb={4}>Add Job Opening</Heading>
      <Flex mb={4}>
        <Button as={Link} to="/ai-interviews" colorScheme="teal" variant="outline">
          &lt; Back
        </Button>
      </Flex>
      <Tabs>
        <TabList>
          <Tab>General Information</Tab>
          <Tab>Interview Questions</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <GeneralInformation />
          </TabPanel>
          <TabPanel>
            <InterviewQuestions />
          </TabPanel>
          <TabPanel>
            <InterviewSettings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AddJob;
