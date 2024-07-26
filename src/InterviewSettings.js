import React, { useState, useEffect } from 'react';
import { Box, Heading, Flex, FormControl, FormLabel, Input, IconButton, Button, Grid, GridItem } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Radar } from 'react-chartjs-2';

const InterviewSettings = () => {
  const [competences, setCompetences] = useState([
    { id: 1, name: 'Dependability', rate: 70 },
    { id: 2, name: 'Problem solving', rate: 80 },
    { id: 3, name: 'Team orientation', rate: 60 },
    { id: 4, name: 'Emotional intelligence', rate: 75 },
    { id: 5, name: 'Communication', rate: 85 },
    { id: 6, name: 'Cognitive ability', rate: 90 }
  ]);

  const [deletedCompetences, setDeletedCompetences] = useState([]);

  const handleAddCompetence = () => {
    setCompetences([...competences, { id: competences.length + 1, name: '', rate: 0 }]);
  };

  const handleCompetenceChange = (id, field, value) => {
    const updatedCompetences = competences.map((competence) =>
      competence.id === id ? { ...competence, [field]: value } : competence
    );
    setCompetences(updatedCompetences);
  };

  const handleDeleteCompetence = (id) => {
    const competenceToDelete = competences.find((competence) => competence.id === id);
    setDeletedCompetences([...deletedCompetences, competenceToDelete]);
    const updatedCompetences = competences.filter((competence) => competence.id !== id);
    setCompetences(updatedCompetences);
  };

  useEffect(() => {
    const handleUndo = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && deletedCompetences.length > 0) {
        const lastDeleted = deletedCompetences[deletedCompetences.length - 1];
        setDeletedCompetences(deletedCompetences.slice(0, -1));
        setCompetences([...competences, lastDeleted]);
      }
    };

    window.addEventListener('keydown', handleUndo);
    return () => window.removeEventListener('keydown', handleUndo);
  }, [deletedCompetences, competences]);

  const data = {
    labels: competences.map((competence) => competence.name),
    datasets: [
      {
        label: 'Competences',
        data: competences.map((competence) => competence.rate),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          display: false,
        },
      },
    },
  };

  const handleGenerateWithAI = () => {
    // Placeholder for future AI functionality
    console.log("Generate with AI button clicked");
  };

  return (
    <Box className="content" p={5}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2">Settings</Heading>
        <Button onClick={handleGenerateWithAI} colorScheme="teal">
          ✨ Generate with AI
        </Button>
      </Flex>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <Flex mb={4} alignItems="center">
            <FormControl flex="1" mr={2}>
              <FormLabel>Competence</FormLabel>
            </FormControl>
            <FormControl flex="1" mr={2}>
              <FormLabel>Rate, %</FormLabel>
            </FormControl>
          </Flex>
          {competences.map((competence) => (
            <Flex key={competence.id} mb={4} alignItems="center">
              <FormControl flex="1" mr={2}>
                <Input
                  value={competence.name}
                  onChange={(e) => handleCompetenceChange(competence.id, 'name', e.target.value)}
                  placeholder="Competence"
                />
              </FormControl>
              <FormControl flex="1" mr={2}>
                <Input
                  type="number"
                  value={competence.rate}
                  onChange={(e) => handleCompetenceChange(competence.id, 'rate', parseInt(e.target.value))}
                  placeholder="Rate, %"
                />
              </FormControl>
              <IconButton
                icon={<DeleteIcon />}
                onClick={() => handleDeleteCompetence(competence.id)}
                aria-label="Delete competence"
                mb={1} // Make sure the delete button is leveled
              />
            </Flex>
          ))}
          <Flex justify="center" mb={4}>
            <Button leftIcon={<AddIcon />} onClick={handleAddCompetence}>
              Add Competence
            </Button>
          </Flex>
        </GridItem>
        <GridItem>
          <Box height="400px" pl={10}>
            <Radar data={data} options={options} />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default InterviewSettings;
