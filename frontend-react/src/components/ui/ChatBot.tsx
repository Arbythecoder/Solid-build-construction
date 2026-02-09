import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, User } from 'lucide-react'
import toast from 'react-hot-toast'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 I'm here to help. What would you like to know about our properties?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [step, setStep] = useState<'greeting' | 'collecting' | 'chatting'>('greeting')

  const botResponses: { [key: string]: string } = {
    'hello': "Hi there! How can I assist you today?",
    'properties': "We have amazing properties in Lagos including Gbagada, Ikeja, and Ogba areas. Would you like to see our listings?",
    'price': "Our properties range from ₦15M to ₦250M. What's your budget range?",
    'location': "We have properties in Gbagada Estate, Ikeja/Allen, and Ogba Lagos. Which area interests you?",
    'contact': "You can reach us at +234 911 525 8580 or email Solid Buildproperty@gmail.com",
    'default': "That's a great question! Let me connect you with one of our agents who can provide detailed information. Could you share your contact details?"
  }

  const handleSend = () => {
    if (!inputMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    // Simple bot response logic
    setTimeout(() => {
      const lowerInput = inputMessage.toLowerCase()
      let botResponse = botResponses.default

      for (const key in botResponses) {
        if (lowerInput.includes(key)) {
          botResponse = botResponses[key]
          break
        }
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 500)

    setInputMessage('')
  }

  const handleCollectInfo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInfo.name || !userInfo.email || !userInfo.phone) {
      toast.error('Please fill all fields')
      return
    }

    // Here you would send to backend
    console.log('User Info:', userInfo)
    toast.success('Thanks! An agent will contact you shortly.')

    const botMessage: Message = {
      id: messages.length + 1,
      text: `Thank you ${userInfo.name}! We've received your information. One of our property experts will contact you soon at ${userInfo.phone}. 😊`,
      sender: 'bot',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, botMessage])
    setStep('chatting')
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 z-50 bg-gradient-gold text-premium-black rounded-full p-4 shadow-2xl"
        aria-label="Open chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            1
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-40 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-gold text-premium-black p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-premium-black/10 flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Solid Build Construction Limited</h3>
                  <p className="text-xs opacity-75">Online • Typically replies instantly</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.sender === 'user'
                        ? 'bg-luxury-gold text-white'
                        : 'bg-white text-gray-800 shadow'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs opacity-60 mt-1 block">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Contact Info Collection Form */}
              {step === 'collecting' && (
                <div className="bg-white rounded-xl p-4 shadow">
                  <p className="text-sm text-gray-700 mb-3">
                    Please share your details so we can assist you better:
                  </p>
                  <form onSubmit={handleCollectInfo} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-luxury-gold"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-luxury-gold"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-luxury-gold"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-luxury-gold text-white py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-luxury-gold"
                />
                <button
                  onClick={handleSend}
                  className="bg-luxury-gold text-white p-2 rounded-full hover:bg-opacity-90 transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              {step === 'greeting' && (
                <button
                  onClick={() => setStep('collecting')}
                  className="mt-2 text-xs text-luxury-gold hover:underline"
                >
                  Need immediate assistance? Click here
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
