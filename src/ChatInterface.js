import React, { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';
import 'mdb-ui-kit/css/mdb.min.css';
import * as mdb from 'mdb-ui-kit';
import logo from './resources/typing.gif';

const ChatInterface = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hi, Let me suggest some Locations to you...!!, \nWhat kind of place you want to go?', sender: 'bot', class: 'ustify-content-end mb-4 pt-1', image: 'ava4-bg.webp' }
  ]);
  const [times, setTimes] = useState(0);  // Initialize times state
  
  const inputRef = useRef(null);
  const chatboxRef = useRef(null);

  useEffect(() => {
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  }, [messages]);

  const handleUserMessage = () => {
    if (userInput.trim() !== '') {
      setMessages((prevMessages) => [...prevMessages, { text: userInput, sender: 'user', class: 'justify-content-end', image: 'ava3-bg.webp' }]);
      sendUserInputToAPI(userInput);
      setUserInput('');
    }
  };

  const sendUserInputToAPI = (input) => {
    const API_URL = 'http://127.0.0.1:5001/api/chat';

    // Display a loading message
    setMessages((prevMessages) => [...prevMessages, { sender: 'bot', class: 'ustify-content-end mb-4 pt-1', image: 'ava4-bg.webp', status: 'loading' }]);

    // Use the times state variable
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_input: input, times: times + 1 }),  // Use times state
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Server Response:', data);

      // Update times state after API call if needed
      setTimes((prevTimes) => prevTimes + 1);

      // If the response includes another question, ask it
      if (data.next_question) {
        setMessages((prevMessages) => [...prevMessages.slice(0, -1)]);
        setMessages((prevMessages) => [...prevMessages, { text: data.next_question, sender: 'bot', class: 'ustify-content-end mb-4 pt-1', image: 'ava4-bg.webp' }]);
      }
      if (data.response) {
         setMessages((prevMessages) => [...prevMessages.slice(0, -1)]);
         setMessages((prevMessages) => [...prevMessages, { text: data.response, sender: 'bot', class: 'ustify-content-end mb-4 pt-1', image: 'ava4-bg.webp' }]);   
         setMessages((prevMessages) => [...prevMessages, { image: data.image_url, sender: 'bot', class: 'ustify-content-end mb-4 pt-1', img:'data.public/test5.jpg'}]);
       }
    })
    .catch((error) => {
      console.error('API Call Error:', error);
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleUserMessage();
    }
  };

  const messageStyle = {
    bot: {
      image: 'ava4-bg.webp',
      backgroundColor: '',
      cardStyle: 'd-flex flex-row justify-content-start',
      bubbleStyle: 'small p-2 ms-3 mb-1  rounded-3 bot-text'
    },
    user: {
      image: 'ava3-bg.webp',
      backgroundColor: '',
      cardStyle: 'd-flex flex-row justify-content-end mb-4 pt-1',
      bubbleStyle: 'small p-2 me-3 mb-1 rounded-3 text-white rounded-3 user-text'
    }
  };

  return (
    <div>
      <section style={{ backgroundColor: "#eee;" }}>
        <div class="container py-5" style={{ height: "auto" }}>
          <div class="row d-flex justify-content-center">
            <div class="col-md-12">
              <div class="card" id="chat2" style={{ width: "60vw" }}>
                <div class="card-header d-flex justify-content-between align-items-center p-3">
                  <h5 class="mb-0">Ask Me Anything</h5>
                </div>
                <div ref={chatboxRef} class="card-body" data-mdb-perfect-scrollbar="true" style={{ position: "relative", height: "70vh", overflowY: "auto" }}>

                  {messages.map((message, index) => (
                    <div key={index} class="d-flex flex-row" className={`${messageStyle[message.sender].cardStyle}`}>
                      {message.sender == 'bot' &&
                        <img src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp`}
                          alt="avatar 1" style={{ width: "45px", height: "100%" }} />
                      }

                      {message.status != 'loading' &&
                        <p className={`${messageStyle[message.sender].bubbleStyle}`}>{message.text}</p>
                      }

                      {message.sender == 'user' &&
                        <img src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp`}
                          alt="avatar 1" style={{ width: "45px", height: "100%" }} />
                      }
                      {message.sender == 'bot' && message.status === 'loading' &&
                        <img src={logo} alt="loading..." style={{ width: "200px", height: "100px" }} />
                      }
                      {message.sender === 'bot' && message.img &&
                      <div>
                        <img src={`https://mdbootstrap.com/img/new/slides/041.webp`} alt="bot image" style={{ width: "200px", height: "100px" }} />
                      </div>
                    }


                    </div>
                  ))}

                </div>
                <div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="avatar 3" style={{ width: "40px", height: "100%" }} />

                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type your message..."
                    class="form-control form-control-lg"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatInterface;
