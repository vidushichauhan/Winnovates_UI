import './App.css';
import React from 'react';
import ChatInterface from './ChatInterface';
 
function App() {
  return (
    <div className="App">
      {/* <div className="logo-container">
        <img src="/logo.png" alt="Your Logo" className="logo-image" />
      </div> */}
      {/* <div><h1>Employee Buddy</h1></div> */}
      <div className="center">
        <ChatInterface />
      </div>
    </div>
  );
}
 
export default App;
 