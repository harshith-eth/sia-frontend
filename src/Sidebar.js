import React from 'react';
import { Box, VStack, Text, Link, Flex, Image } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FiBarChart2, FiCpu, FiFileText, FiSettings, FiLogOut, FiClipboard, FiCalendar } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import zavataLogo from './zavata-logo.png';
import './App.css';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: "/dashboard", icon: <FiBarChart2 size={24} />, label: "Dashboard" },
    { to: "/applications", icon: <FiClipboard size={24} />, label: "Applications" },
    { to: "/scheduler", icon: <FiCalendar size={24} />, label: "Scheduler" },
    { to: "/ai-interviews", icon: <FiCpu size={24} />, label: "AI Interviews" },
    { to: "/reports", icon: <FiFileText size={24} />, label: "Reports" },
    { to: "/settings", icon: <FiSettings size={24} />, label: "Settings" },
  ];

  const handleSiaClick = () => {
    window.open('/candidate-interview', '_blank');
  };

  return (
    <Box className="sidebar" height="100vh" display="flex" flexDirection="column" justifyContent="space-between">
      <Box>
        <Flex justifyContent="space-between" alignItems="center" mb={5}>
          <Flex alignItems="center">
            <Image src={zavataLogo} boxSize="22px" alt="Zavata Logo" />
            <Text fontSize="xl" fontWeight="bold" ml={3}>Zavata</Text>
          </Flex>
        </Flex>
        <VStack spacing={3} align="stretch">
          {links.map((link) => (
            <Link
              as={RouterLink}
              to={link.to}
              textAlign="left"
              key={link.label}
              className={location.pathname === link.to ? "active-link" : ""}
              style={{ textDecoration: 'none' }}
            >
              <Flex alignItems="center">
                {link.icon}
                <Text fontSize="lg" ml={2}>{link.label}</Text>
              </Flex>
            </Link>
          ))}
          <Link
            as="button"
            textAlign="left"
            onClick={handleSiaClick}
            className={location.pathname === "/candidate-interview" ? "active-link" : ""}
            style={{ textDecoration: 'none' }}
          >
            <Flex alignItems="center">
              <FaRobot size={24} />
              <Text fontSize="lg" ml={2}>SIA</Text>
            </Flex>
          </Link>
        </VStack>
      </Box>
      <Box mb={5}>
        <Link
          as={RouterLink}
          to="/logout"
          textAlign="left"
          className={location.pathname === "/logout" ? "active-link" : ""}
          style={{ textDecoration: 'none' }}
        >
          <Flex alignItems="center">
            <FiLogOut size={24} />
            <Text fontSize="lg" ml={2}>Logout</Text>
          </Flex>
        </Link>
      </Box>
    </Box>
  );
};

export default Sidebar;
