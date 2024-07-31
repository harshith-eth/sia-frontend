import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CandidateInterview from './components/CandidateInterview'; // Make sure this path is correct
import { ChakraProvider, Box } from '@chakra-ui/react';
import './App.css';
import theme from './theme';

function Home() {
  return <Navigate to="/candidate-interview" />;
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candidate-interview" element={<CandidateInterview />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
