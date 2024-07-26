import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Applications from './Applications';
import Scheduler from './Scheduler';
import AIInterviews from './AIInterviews';
import JobDetails from './JobDetails';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import Reports from './Reports';
import Settings from './Settings';
import Logout from './Logout';
import Login from './Login';
import Signup from './Signup';
import AddJob from './AddJob';
import CandidateInterview from './components/CandidateInterview';
import { ChakraProvider, Box } from '@chakra-ui/react';
import './App.css';
import theme from './theme';

function Home() {
  return <Navigate to="/dashboard" />;
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/candidate-interview" element={<CandidateInterview />} /> {/* New Route */}
          <Route
            path="*"
            element={
              <Box className="app-container">
                <Sidebar />
                <Box className="main-content">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/applications" element={<Applications />} />
                    <Route path="/scheduler" element={<Scheduler />} />
                    <Route path="/ai-interviews" element={<AIInterviews />} />
                    <Route path="/ai-interviews/add-job" element={<AddJob />} />
                    <Route path="/ai-interviews/:jobId" element={<JobDetails />} />
                    <Route path="/ai-interviews/:jobId/kanban" element={<KanbanBoard />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/logout" element={<Logout />} />
                  </Routes>
                </Box>
              </Box>
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
