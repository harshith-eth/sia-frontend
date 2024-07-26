// ColorModeSwitcher.js
import { IconButton, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ColorModeSwitcher = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon = colorMode === 'light' ? <FaMoon /> : <FaSun />;

  return (
    <IconButton
      aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      icon={icon}
      onClick={toggleColorMode}
      {...props}
    />
  );
};

export default ColorModeSwitcher;
