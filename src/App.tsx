import { useState } from 'react'
import { ChatInput } from './components/Chat/ChatInput'
import { ChatMessage } from './components/Chat/ChatMessage'
import { useChatStore } from './store/chatStore'
import './styles/App.css'

const API_URL = import.meta.env.DEV 
  ? 'http://localhost:3000/api/chat'
  : '/api/chat';

export default function App() {
  const { messages, addMessage } = useChatStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (content: string) => {
    try {
      // Add user message
      addMessage({
        id: Date.now().toString(),
        content,
        sender: 'user',
        timestamp: new Date(),
      })

      setIsLoading(true)

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      addMessage({
        id: (Date.now() + 1).toString(),
        content: data.message,
        sender: 'george',
        timestamp: new Date(),
      })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="space-y-4 mb-4 h-[500px] overflow-y-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  )
}