import { ChatInput } from './components/Chat/ChatInput'
import { ChatMessage } from './components/Chat/ChatMessage'
import { useChatStore } from './store/chatStore'
import './styles/App.css'


export default function Home() {
  const { messages, addMessage } = useChatStore()

  const handleSend = async (content: string) => {
    try {
      // Add user message
      addMessage({
        id: Date.now().toString(),
        content,
        sender: 'user',
        timestamp: new Date(),
      })
  
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content })  // Make sure this matches your API expectation
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const data = await response.json()
      console.log('API Response:', data)  // Add this for debugging
  
      addMessage({
        id: (Date.now() + 1).toString(),
        content: data.message,
        sender: 'george',
        timestamp: new Date(),
      })
    } catch (error) {
      console.error('Error:', error)
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
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  )
}