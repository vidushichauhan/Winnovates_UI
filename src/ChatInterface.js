import React, { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';
import 'mdb-ui-kit/css/mdb.min.css';
import * as mdb from 'mdb-ui-kit';
import logo from './resources/typing.gif'

const ChatInterface = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([{ text: 'Hi, How can I help you today?', sender: 'bot', class: 'ustify-content-end mb-4 pt-1', image: 'ava4-bg.webp' }]);
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
    const API_URL = 'http://127.0.0.1:5000/api/chat';

    const botMessage = {sender: 'bot', class: 'ustify-content-end mb-4 pt-1', image: 'ava4-bg.webp', status: 'loading'};
        setMessages((prevMessages) => [...prevMessages, botMessage]);

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_input: input }),
    })
      .then((response) => response.json())
      .then((data) => {
        const botMessage = { text: data.response, sender: 'bot', class: 'ustify-content-end mb-4 pt-1', image: 'ava4-bg.webp'};
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages.pop();
          return [...newMessages, botMessage];
        });
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

  const messageStyle= {
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
      bubbleStyle: 'small p-2 me-3 mb-1 rounded-3 text-white rounded-3 bg-primary user-text'
    }
  };


  return (
    /*<div className="chat-container">
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
    </div>*/
  <div>
    <section style={{backgroundColor: "#eee;"}}>
      <div class="container py-5" style={{height: "auto"}}>
        <div class="row d-flex justify-content-center">
          <div class="col-md-12">
            <div class="card" id="chat2" style={{width: "60vw"}}>
              <div class="card-header d-flex justify-content-between align-items-center p-3">
                <h5 class="mb-0">Ask Me Anything</h5>
              </div>
              <div ref={chatboxRef} class="card-body" data-mdb-perfect-scrollbar="true" style={{position: "relative", height: "70vh", overflowY: "auto"}}>

                {/* <div class="d-flex flex-row justify-content-start">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="avatar 1" style={{width: "45px", height:"100%"}} />
                  <div>
                    <p class="small p-2 ms-3 mb-1 rounded-3" style= {{backgroundColor: "#f5f6f7"}}>Hi</p>
                    <p class="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>How are you ...???
                    </p>
                    <p class="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>What are you doing
                      tomorrow? Can we come up a bar?</p>
                    <p class="small ms-3 mb-3 rounded-3 text-muted">23:58</p>
                  </div>
                </div> */}

                {messages.map((message, index) => (
                  <div key={index} class="d-flex flex-row" className={`${messageStyle[message.sender].cardStyle}`}>
                    {message.sender == 'bot' &&
                     <img src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp`}
                      alt="avatar 1" style={{width: "45px", height:"100%"}} />
                    }

                    {message.status != 'loading' &&
                    <p  className={`${messageStyle[message.sender].bubbleStyle}`}>{message.text}</p>
                    }

                    
                    {message.sender == 'user' &&
                     <img src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp`}
                      alt="avatar 1" style={{width: "45px", height:"100%"}} />
                    }
                    {message.sender == 'bot' && message.status === 'loading' &&
                    <img src={logo} alt="loading..." style={{width: "200px", height:"100px"}} />
                    }
                  </div>
                ))}

                {/* <div class="d-flex flex-row justify-content-end mb-4 pt-1">
                  <div>
                    <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">Hiii, I'm good.</p>
                    <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">How are you doing?</p>
                    <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">Long time no see! Tomorrow
                      office. will
                      be free on sunday.</p>
                    <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">00:06</p>
                  </div>
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                    alt="avatar 1" style={{width: "45px", height: "100%"}} />
                </div>

                <div class="d-flex flex-row justify-content-start mb-4">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="avatar 1" style={{width: "45px", height: "100%"}} />
                  <div>
                    <p class="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>Okay</p>
                    <p class="small p-2 ms-3 mb-1 rounded-3" style={{backgroundColor: "#f5f6f7"}}>We will go on
                      Sunday?</p>
                    <p class="small ms-3 mb-3 rounded-3 text-muted">00:07</p>
                  </div>
                </div>

                <div class="d-flex flex-row justify-content-end mb-4">
                  <div>
                    <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">That's awesome!</p>
                    <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">I will meet you Sandon Square
                      sharp at
                      10 AM</p>
                    <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">Is that okay?</p>
                    <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">00:09</p>
                  </div>
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                    alt="avatar 1" style={{width: "45px", height: "100%"}} />
                </div> */}

              </div>
              <div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                  alt="avatar 3" style={{width: "40px", height: "100%"}} />

                <input
                          ref={inputRef}
                          type="text"
                          placeholder="Type your message..."
                          class="form-control form-control-lg"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          onKeyDown={handleKeyPress}
                        />

                {/* <input type="text" class="form-control form-control-lg" id="exampleFormControlInput1"
                  placeholder="Type message"/> */}
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
