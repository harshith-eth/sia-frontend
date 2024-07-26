import React, { useState } from 'react';
import { Box, Heading, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Input, Textarea, Select, Button } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const [visa, setVisa] = useState('');
  const [remote, setRemote] = useState('');
  const [pointers, setPointers] = useState('');
  const [questions, setQuestions] = useState('');
  const [interviewType, setInterviewType] = useState('technical');
  const [difficulty, setDifficulty] = useState('medium');

  const handleSave = () => {
    // Save job logic
    navigate('/ai-interviews');
  };

  const handleGenerateDescription = () => {
    // AI job description generation logic
  };

  const handleGenerateQuestions = () => {
    // AI interview questions generation logic
  };

  return (
    <Box p={5}>
      <Heading as="h1" mb={4}>{id ? 'Edit' : 'Add'} Job</Heading>
      <Tabs>
        <TabList>
          <Tab>General Information</Tab>
          <Tab>Interview Questions</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack spacing={4}>
              <Input
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              <Input
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
              <Input
                placeholder="Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
              <Input
                placeholder="Visa Status"
                value={visa}
                onChange={(e) => setVisa(e.target.value)}
              />
              <Input
                placeholder="Remote/In-Person"
                value={remote}
                onChange={(e) => setRemote(e.target.value)}
              />
              <Button onClick={handleGenerateDescription} colorScheme="teal">
                Generate Job Description with AI
              </Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4}>
              <Textarea
                placeholder="Pointers for Questions"
                value={pointers}
                onChange={(e) => setPointers(e.target.value)}
              />
              <Textarea
                placeholder="Specific Questions"
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
              />
              <Button onClick={handleGenerateQuestions} colorScheme="teal">
                Generate Interview Questions with AI
              </Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4}>
              <Select
                placeholder="Select Interview Type"
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
              >
                <option value="technical">Technical</option>
                <option value="intern">Intern</option>
                {/* Add more options as needed */}
              </Select>
              <Select
                placeholder="Select Difficulty Level"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Select>
              {/* Add graph or other settings fields as needed */}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button onClick={handleSave} colorScheme="teal" mt={4}>
        Save Changes
      </Button>
      <Button onClick={() => navigate('/ai-interviews')} colorScheme="gray" mt={4}>
        Back to Job Openings
      </Button>
    </Box>
  );
};

export default AddEditJob;
