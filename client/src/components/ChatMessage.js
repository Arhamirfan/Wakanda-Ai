import React from 'react'

export default function ChatMessage({ message, isUser = false }) {
  return (
    <div className={`chat-message ${isUser ? 'user' : 'bot'}`}>
      <div className="message-content">
        {message}
      </div>
    </div>
  )
}
