import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Textarea, Button, Flex, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const InterviewQuestions = () => {
  const [questions, setQuestions] = useState([{ id: 1, value: '' }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, value: '' }]);
  };

  const handleQuestionChange = (id, newValue) => {
    const updatedQuestions = questions.map(question =>
      question.id === id ? { ...question, value: newValue } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleGenerateQuestions = () => {
    // This is where you will handle the question generation with AI
    // For now, let's simulate it with a simple log
    console.log('Generate interview questions with AI based on provided pointers');
  };

  return (
    <Box className="content" p={5}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2">Interview Questions</Heading>
        <Button onClick={handleGenerateQuestions} colorScheme="teal">
          ✨ Generate with AI
        </Button>
      </Flex>
      {questions.map((question, index) => (
        <FormControl mb={4} key={question.id}>
          <FormLabel>Question {index + 1}</FormLabel>
          <Textarea
            value={question.value}
            onChange={(e) => handleQuestionChange(question.id, e.target.value)}
            placeholder={`Question ${index + 1}`}
          />
        </FormControl>
      ))}
      <Flex justify="center" align="center" mt={4}>
        <IconButton
          aria-label="Add Question"
          icon={<AddIcon />}
          onClick={handleAddQuestion}
        />
      </Flex>
    </Box>
  );
};

export default InterviewQuestions;
