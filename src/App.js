import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { DocumentSnippet } from './DocumentSnippet';

function App() {
  const [message, setMessage] = useState('');
  const [snippet, setSnippet] = useState('');
  const [messages, setMessages] = useState([
    {
      message: "Hello my friend, I'm LingoLlama! I'm here to help you navigate through the maze of travel insurance documents and find you the best policy. So, what are you planning for your holiday?",
      sentTime: "just now",
      sender: "LingoLlama",
    }
  ]);

  const handleSendMessage = () => {
    const newMessage = { message, sentTime: "just now", sender: "You", direction: "outgoing" };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    // Prepare data for API
    const apiData = newMessages.map(msg => ({
        role: msg.sender.toLowerCase(),
        content: msg.message
    }));

    // Call your API
    fetch('http://127.0.0.1:5000/api/hello', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
    }).then(response => response.json())
    .then(data => {
        // handle response
        setSnippet(data.express);
        setMessage('');
    });
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to LingoLlama!</h1>
        <p>Your fun assistant for navigating insurance documents. I'm here to find you the best policy based on available documents! Now, let's get started.</p>
        <div style={{ display: 'flex', justifyContent: 'space-around', height: "500px", padding: '20px' }}>
          <div style={{ flex: 1, marginRight: '10px' }}>
            <DocumentSnippet snippet={snippet} />
          </div>
          <MainContainer style={{ flex: 1, maxWidth: '500px', marginLeft: '10px' }}>
            <ChatContainer>
              <MessageList>
                {messages.map((msg, index) => (
                  <Message key={index} model={msg} direction={msg.sender === 'You' ? 'outgoing' : 'incoming'} />
                ))}
              </MessageList>
              <MessageInput value={message} onChange={val => setMessage(val)} onSend={handleSendMessage} placeholder="Tell me about your holiday plans" />
            </ChatContainer>
          </MainContainer>
        </div>
      </header>
    </div>
  );
}

export default App;
