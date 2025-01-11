import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm here to help. How can I assist you?", sender: "assistant" },
  ]);

  const handleSend = (text) => {
    setMessages([...messages, { text, sender: "user" }]);
    // Simulate a response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "That's a great question! Let me assist you.", sender: "assistant" },
      ]);
    }, 1000);
  };

  return (
    <div style={{ position: "fixed", bottom: 0, right: 0, width: "300px", height: "400px" }}>
      <ChatContainer>
        <MessageList>
          {messages.map((msg, index) => (
            <Message
              key={index}
              model={{
                message: msg.text,
                sentTime: "just now",
                sender: msg.sender,
                direction: msg.sender === "user" ? "outgoing" : "incoming",
              }}
            />
          ))}
        </MessageList>
        <MessageInput placeholder="Type here..." onSend={handleSend} />
      </ChatContainer>
    </div>
  );
};

export default ChatAssistant;
