import React from 'react';
import { Message } from '../../types/chat';

interface Props {
  message: Message;
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`message ${isUser ? 'user-message' : 'george-message'}`}>
      <div className="message-content">
        {message.content}
      </div>
    </div>
  );
};