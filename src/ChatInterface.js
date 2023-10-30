import React, { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';

const ChatInterface = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([{ text: 'Hi, How can I help you today?', sender: 'bot' }]);
  const inputRef = useRef(null);
  const chatboxRef = useRef(null);

  useEffect(() => {
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  }, [messages]);

  const handleUserMessage = () => {
    if (userInput.trim() !== '') {
      setMessages((prevMessages) => [...prevMessages, { text: userInput, sender: 'user' }]);
      sendUserInputToAPI(userInput);
      setUserInput('');
    }
  };

  const sendUserInputToAPI = (input) => {
    const API_URL = 'http://127.0.0.1:5000/api/chat';

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_input: input }),
    })
      .then((response) => response.json())
      .then((data) => {
        const botMessage = { text: data.response, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleUserMessage();
    }
  };

  return (
    <div className="chat-container">
      <div ref={chatboxRef} className="chatbox">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="user-input">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleUserMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
