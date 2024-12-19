import React from 'react'
import { ChatInput } from './components/Chat/ChatInput'
import { ChatMessage } from './components/Chat/ChatMessage'
import { useChatStore } from './store/chatStore'

export default function App() {
  const { messages, addMessage } = useChatStore()

  const handleSend = async (content: string) => {
    try {
      addMessage({
        id: Date.now().toString(),
        content,
        sender: 'user',
        timestamp: new Date()
      })

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content })
      })

      const data = await response.json()
      
      addMessage({
        id: (Date.now() + 1).toString(),
        content: data.message,
        sender: 'george',
        timestamp: new Date()
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="app">
      <div className="messages">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  )
}