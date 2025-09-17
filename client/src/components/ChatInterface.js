import React from 'react'
import ChatMessage from './ChatMessage'

export default function ChatInterface({ messages, isTyping = false }) {
  return (
    <div className="chat-interface">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <ChatMessage 
            key={index} 
            message={msg.content} 
            isUser={msg.isUser} 
          />
        ))}
        {isTyping && (
          <div className="chat-message bot">
            <div className="message-content typing">
              <span className="typing-dots">
                <span>.</span><span>.</span><span>.</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
