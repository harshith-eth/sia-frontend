import { useEffect, useRef, useState } from 'react';

const useWebSocketCommunication = (url) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    const connectWebSocket = () => {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
      };

      ws.current.onmessage = (event) => {
        console.log('WebSocket message received:', event.data);
        setLastMessage(event.data);
      };

      ws.current.onclose = () => {
        console.log('WebSocket closed. Reconnecting...');
        setIsConnected(false);
        setTimeout(connectWebSocket, 3000);
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    };

    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url]);

  const sendMessage = (message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    } else {
      console.error('WebSocket is not open. Unable to send message.');
    }
  };

  return { sendMessage, isConnected, lastMessage };
};

export default useWebSocketCommunication;