// Settings.js
import React from 'react';
import {
  Box,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  VStack,
  HStack,
  Select,
  Switch,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import {
  FaSave,
  FaUser,
  FaBuilding,
  FaUsers,
  FaBell,
  FaCogs,
  FaTools,
  FaDatabase,
  FaShieldAlt,
  FaPalette,
  FaLanguage,
  FaKey
} from 'react-icons/fa';
import ColorModeSwitcher from './ColorModeSwitcher'; // Ensure this is correctly imported

const Settings = () => {
  const toast = useToast();

  const handleSave = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your changes have been saved successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <Heading as="h1" mb={4}>Settings</Heading>
      <Tabs variant="soft-rounded" colorScheme="teal" orientation="vertical">
        <TabList>
          <Tab><FaUser /></Tab>
          <Tab><FaBuilding /></Tab>
          <Tab><FaUsers /></Tab>
          <Tab><FaBell /></Tab>
          <Tab><FaTools /></Tab>
          <Tab><FaShieldAlt /></Tab>
          <Tab><FaPalette /></Tab>
          <Tab><FaDatabase /></Tab>
          <Tab><FaCogs /></Tab>
          <Tab><FaKey /></Tab>
          <Tab><FaLanguage /></Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Heading size="lg" mb={4}>User Account Settings</Heading>
            <VStack spacing={5} align="stretch">
              <Box>
                <Heading size="md" mb={3}>Profile Information</Heading>
                <FormControl mb={4}>
                  <FormLabel>Name</FormLabel>
                  <Input placeholder="Name" />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="Email" />
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>Password Management</Heading>
                <FormControl mb={4}>
                  <FormLabel>Current Password</FormLabel>
                  <Input type="password" placeholder="Current Password" />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>New Password</FormLabel>
                  <Input type="password" placeholder="New Password" />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Confirm New Password</FormLabel>
                  <Input type="password" placeholder="Confirm New Password" />
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>Two-Factor Authentication (2FA)</Heading>
                <FormControl display="flex" alignItems="center" mb={4}>
                  <FormLabel mb="0">Enable 2FA</FormLabel>
                  <Switch id="2fa" />
                </FormControl>
              </Box>
              <Button colorScheme="blue" leftIcon={<FaSave />} onClick={handleSave}>Save Changes</Button>
            </VStack>
          </TabPanel>

          <TabPanel>
            <Heading size="lg" mb={4}>Organization Settings</Heading>
            <VStack spacing={5} align="stretch">
              <Box>
                <Heading size="md" mb={3}>Company Profile</Heading>
                <FormControl mb={4}>
                  <FormLabel>Company Name</FormLabel>
                  <Input placeholder="Company Name" />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Address</FormLabel>
                  <Input placeholder="Address" />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Logo</FormLabel>
                  <Input type="file" />
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>Billing Information</Heading>
                <FormControl mb={4}>
                  <FormLabel>Payment Method</FormLabel>
                  <Input placeholder="Payment Method" />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Invoices</FormLabel>
                  <Button colorScheme="teal">View Invoices</Button>
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>Subscription Plan</Heading>
                <FormControl mb={4}>
                  <FormLabel>Current Plan</FormLabel>
                  <Select placeholder="Select Plan">
                    <option>Free</option>
                    <option>Basic</option>
                    <option>Premium</option>
                  </Select>
                </FormControl>
                <Button colorScheme="blue">Upgrade/Downgrade Plan</Button>
              </Box>
              <Button colorScheme="blue" leftIcon={<FaSave />} onClick={handleSave}>Save Changes</Button>
            </VStack>
          </TabPanel>

          <TabPanel>
            <Heading size="lg" mb={4}>Team Management Settings</Heading>
            <VStack spacing={5} align="stretch">
              <Box>
                <Heading size="md" mb={3}>User Roles and Permissions</Heading>
                <FormControl mb={4}>
                  <FormLabel>Roles</FormLabel>
                  <Select placeholder="Select Role">
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Employee</option>
                  </Select>
                </FormControl>
                <Button colorScheme="teal">Manage Permissions</Button>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>Invite Team Members</Heading>
                <FormControl mb={4}>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="Email" />
                </FormControl>
                <Button colorScheme="blue">Send Invitation</Button>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>Manage Teams/Departments</Heading>
                <Button colorScheme="teal">Create Team</Button>
                <Button colorScheme="teal" ml={3}>Manage Departments</Button>
              </Box>
              <Button colorScheme="blue" leftIcon={<FaSave />} onClick={handleSave}>Save Changes</Button>
            </VStack>
          </TabPanel>

          <TabPanel>
            <Heading size="lg" mb={4}>Notifications Settings</Heading>
            <VStack spacing={5} align="stretch">
              <Box>
                <Heading size="md" mb={3}>Email Notifications Preferences</Heading>
                <FormControl mb={4}>
                  <FormLabel>Email Notifications</FormLabel>
                  <Switch id="email-notifications" />
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>In-App Notifications Preferences</Heading>
                <FormControl mb={4}>
                  <FormLabel>In-App Notifications</FormLabel>
                  <Switch id="in-app-notifications" />
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>SMS Notifications Preferences</Heading>
                <FormControl mb={4}>
                  <FormLabel>SMS Notifications</FormLabel>
                  <Switch id="sms-notifications" />
                </FormControl>
              </Box>
              <Button colorScheme="blue" leftIcon={<FaSave />} onClick={handleSave}>Save Changes</Button>
            </VStack>
          </TabPanel>

          <TabPanel>
            <Heading size="lg" mb={4}>Integrations Settings</Heading>
            <VStack spacing={5} align="stretch">
              <Box>
                <Heading size="md" mb={3}>Connected Apps</Heading>
                <FormControl mb={4}>
                  <FormLabel>Slack</FormLabel>
                  <Button colorScheme="teal">Connect</Button>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Zapier</FormLabel>
                  <Button colorScheme="teal">Connect</Button>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>CRM</FormLabel>
                  <Button colorScheme="teal">Connect</Button>
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>API Access</Heading>
                <FormControl mb={4}>
                  <FormLabel>API Key</FormLabel>
                  <Input placeholder="API Key" />
                </FormControl>
                <Button colorScheme="blue">Generate New Key</Button>
              </Box>
              <Button colorScheme="blue" leftIcon={<FaSave />} onClick={handleSave}>Save Changes</Button>
            </VStack>
          </TabPanel>

          <TabPanel>
            <Heading size="lg" mb={4}>Security Settings</Heading>
            <VStack spacing={5} align="stretch">
              <Box>
                <Heading size="md" mb={3}>Session Management</Heading>
                <FormControl mb={4}>
                  <FormLabel>Active Sessions</FormLabel>
                  <Button colorScheme="teal">Manage Sessions</Button>
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>IP Whitelisting/Blacklisting</Heading>
                <FormControl mb={4}>
                  <FormLabel>IP Addresses</FormLabel>
                  <Input placeholder="Enter IP Address" />
                </FormControl>
                <Button colorScheme="blue">Add to Whitelist</Button>
                <Button colorScheme="blue" ml={3}>Add to Blacklist</Button>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>Access Logs</Heading>
                <Button colorScheme="teal">View Logs</Button>
              </Box>
              <Button colorScheme="blue" leftIcon={<FaSave />} onClick={handleSave}>Save Changes</Button>
            </VStack>
          </TabPanel>

          <TabPanel>
            <Heading size="lg" mb={4}>Appearance Settings</Heading>
            <VStack spacing={5} align="stretch">
              <Box>
                <Heading size="md" mb={3}>Theme Selection</Heading>
                <FormControl mb={4}>
                  <FormLabel>Light/Dark Mode</FormLabel>
                  <ColorModeSwitcher />
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>Custom Branding</Heading>
                <FormControl mb={4}>
                  <FormLabel>Logo</FormLabel>
                  <Input type="file" />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Primary Color</FormLabel>
                  <Input type="color" />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Secondary Color</FormLabel>
                  <Input type="color" />
                </FormControl>
              </Box>
              <Button colorScheme="blue" leftIcon={<FaSave />} onClick={handleSave}>Save Changes</Button>
            </VStack>
          </TabPanel>

          <TabPanel>
            <Heading size="lg" mb={4}>Data Management Settings</Heading>
            <VStack spacing={5} align="stretch">
              <Box>
                <Heading size="md" mb={3}>Data Export/Import</Heading>
                <FormControl mb={4}>
                  <FormLabel>Export Data</FormLabel>
                  <Button colorScheme="teal">Export</Button>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Import Data</FormLabel>
                  <Input type="file" />
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>Data Retention Policies</Heading>
                <FormControl mb={4}>
                  <FormLabel>Retention Period</FormLabel>
                  <Select placeholder="Select Retention Period">
                    <option>30 Days</option>
                    <option>60 Days</option>
                    <option>90 Days</option>
                  </Select>
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>Backup and Restore</Heading>
                <Button colorScheme="teal">Backup Now</Button>
                <Button colorScheme="teal" ml={3}>Restore</Button>
              </Box>
              <Button colorScheme="blue" leftIcon={<FaSave />} onClick={handleSave}>Save Changes</Button>
            </VStack>
          </TabPanel>

          <TabPanel>
            <Heading size="lg" mb={4}>Advanced Settings</Heading>
            <VStack spacing={5} align="stretch">
              <Box>
                <Heading size="md" mb={3}>Feature Toggles</Heading>
                <FormControl mb={4}>
                  <FormLabel>Feature 1</FormLabel>
                  <Switch id="feature-1" />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Feature 2</FormLabel>
                  <Switch id="feature-2" />
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>Beta Features Access</Heading>
                <FormControl mb={4}>
                  <FormLabel>Beta Feature 1</FormLabel>
                  <Switch id="beta-feature-1" />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Beta Feature 2</FormLabel>
                  <Switch id="beta-feature-2" />
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>Custom Scripts/Code Injection</Heading>
                <FormControl mb={4}>
                  <FormLabel>Custom Script</FormLabel>
                  <Textarea placeholder="Enter your custom script" />
                </FormControl>
              </Box>
              <Button colorScheme="blue" leftIcon={<FaSave />} onClick={handleSave}>Save Changes</Button>
            </VStack>
          </TabPanel>

          <TabPanel>
            <Heading size="lg" mb={4}>AI Configuration Settings</Heading>
            <VStack spacing={5} align="stretch">
              <Box>
                <Heading size="md" mb={3}>AI Model Settings</Heading>
                <FormControl mb={4}>
                  <FormLabel>Tuning</FormLabel>
                  <Input placeholder="Tuning" />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Version</FormLabel>
                  <Select placeholder="Select Version">
                    <option>v1.0</option>
                    <option>v1.1</option>
                    <option>v2.0</option>
                  </Select>
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>AI Training Data Preferences</Heading>
                <FormControl mb={4}>
                  <FormLabel>Training Data</FormLabel>
                  <Input placeholder="Training Data" />
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>Custom Responses and Phrases</Heading>
                <FormControl mb={4}>
                  <FormLabel>Custom Responses</FormLabel>
                  <Textarea placeholder="Enter custom responses" />
                </FormControl>
              </Box>
              <Button colorScheme="blue" leftIcon={<FaSave />} onClick={handleSave}>Save Changes</Button>
            </VStack>
          </TabPanel>

          <TabPanel>
            <Heading size="lg" mb={4}>Interview Settings</Heading>
            <VStack spacing={5} align="stretch">
              <Box>
                <Heading size="md" mb={3}>Custom Prompts for AI Interviewer</Heading>
                <FormControl mb={4}>
                  <FormLabel>Custom Prompts</FormLabel>
                  <Textarea placeholder="Enter custom prompts" />
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>Interview Templates</Heading>
                <FormControl mb={4}>
                  <FormLabel>Templates</FormLabel>
                  <Textarea placeholder="Enter interview templates" />
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>Feedback Mechanisms</Heading>
                <FormControl mb={4}>
                  <FormLabel>Feedback</FormLabel>
                  <Textarea placeholder="Enter feedback mechanisms" />
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>Interview Scheduling Preferences</Heading>
                <FormControl mb={4}>
                  <FormLabel>Scheduling Preferences</FormLabel>
                  <Input placeholder="Enter scheduling preferences" />
                </FormControl>
              </Box>
              <Button colorScheme="blue" leftIcon={<FaSave />} onClick={handleSave}>Save Changes</Button>
            </VStack>
          </TabPanel>

          <TabPanel>
            <Heading size="lg" mb={4}>Miscellaneous Settings</Heading>
            <VStack spacing={5} align="stretch">
              <Box>
                <Heading size="md" mb={3}>Language Preferences</Heading>
                <FormControl mb={4}>
                  <FormLabel>Language</FormLabel>
                  <Select placeholder="Select Language">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </Select>
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>Time Zone Settings</Heading>
                <FormControl mb={4}>
                  <FormLabel>Time Zone</FormLabel>
                  <Select placeholder="Select Time Zone">
                    <option>GMT</option>
                    <option>EST</option>
                    <option>PST</option>
                  </Select>
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <Heading size="md" mb={3}>Custom Email Templates</Heading>
                <FormControl mb={4}>
                  <FormLabel>Email Templates</FormLabel>
                  <Textarea placeholder="Enter custom email templates" />
                </FormControl>
              </Box>
              <Button colorScheme="blue" leftIcon={<FaSave />} onClick={handleSave}>Save Changes</Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Settings;
