import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  X, 
  Minimize2, 
  Maximize2,
  Volume2,
  VolumeX,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const NEXAA = ({ isDark, isOpen, onToggle, onMinimize }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm NEXAA, Aadithyan's personal AI assistant. I know everything about his skills, projects, and experience. I'm here to represent him professionally and answer any questions about his work. What would you like to know about Aadithyan?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isGeminiEnabled, setIsGeminiEnabled] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const genAI = useRef(null);
  const model = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize Gemini AI
  useEffect(() => {
    const initializeGemini = async () => {
      try {
        // You can replace this with your actual API key or use environment variable
        const apiKey = 'AIzaSyD081ZXe0XUHi-b-Zge3ZYo4oc-jdF2XBs';
        
        if (apiKey && apiKey.length > 0) {
          genAI.current = new GoogleGenerativeAI(apiKey);
          model.current = genAI.current.getGenerativeModel({ model: "gemini-1.5-flash" });
          setIsGeminiEnabled(true);
          console.log('Gemini AI initialized successfully!');
        } else {
          console.log('Gemini API key not found, using fallback responses');
          setIsGeminiEnabled(false);
        }
      } catch (error) {
        console.error('Failed to initialize Gemini AI:', error);
        setIsGeminiEnabled(false);
      }
    };

    initializeGemini();
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      let aiResponse;
      
      if (isGeminiEnabled && model.current) {
        // Use Gemini AI with continuous conversation context
        aiResponse = await generateGeminiResponse(inputValue, messages);
      } else {
        // Fallback to predefined responses
        aiResponse = generateAIResponse(inputValue);
      }

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      let errorMessage;
      if (error.message.includes('Invalid API key')) {
        errorMessage = "I'm having trouble with my API key. Please check the Gemini API configuration.";
      } else if (error.message.includes('quota exceeded')) {
        errorMessage = "I've reached my API limit for today. Please try again tomorrow or use fallback mode.";
      } else if (error.message.includes('safety filters')) {
        errorMessage = "I can't respond to that question due to content filters. Please ask about Aadithyan's work instead.";
      } else {
        errorMessage = "I'm having trouble connecting to my AI brain right now. Let me try with my fallback responses...";
        // Try fallback response
        const fallbackResponse = generateAIResponse(inputValue);
        const fallbackMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: fallbackResponse,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, fallbackMessage]);
        setIsTyping(false);
        return;
      }
      
      const errorMsg = {
        id: Date.now() + 1,
        type: 'ai',
        content: errorMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateGeminiResponse = async (userInput, conversationHistory) => {
    try {
      // Build conversation context for Gemini (limit to last 10 messages to avoid token limits)
      const recentHistory = conversationHistory.slice(-10);
      const conversationContext = recentHistory.map(msg => {
        if (msg.type === 'user') {
          return `User: ${msg.content}`;
        } else {
          return `NEXAA: ${msg.content}`;
        }
      }).join('\n');

      const prompt = `You are NEXAA, Aadithyan's personal AI assistant. You know everything about Aadithyan's skills, projects, and experience. You represent him professionally and answer questions about his work.

PORTFOLIO INFORMATION:
- Name: Aadithyan
- Role: Full Stack Developer with 2+ years experience
- Education: Masai School (Full Stack), Diploma in Computer Hardware (2024)
- Skills: React, TypeScript, Node.js, MongoDB, PostgreSQL, Rust, Next.js, and 19+ technologies
- Projects: CodeFit (GitHub recruiting platform), Movie Trailer App, Flipkart Clone, TicTacToe
- Contact: GitHub (@Aadithyanas), LinkedIn, Email (adithyanas2694@gmail.com)

CONVERSATION HISTORY:
${conversationContext}

CURRENT USER QUESTION: ${userInput}

INSTRUCTIONS:
- Respond as NEXAA, Aadithyan's personal AI assistant
- Use the conversation history to provide context-aware responses
- Be professional, helpful, and knowledgeable about Aadithyan's work
- Keep responses concise but informative (max 200 words)
- If asked about something not in the portfolio, politely redirect to what you can help with
- Maintain conversation flow and reference previous messages when relevant
- Always end with a question to keep the conversation engaging

RESPOND AS NEXAA:`;

      console.log('Sending prompt to Gemini:', prompt.substring(0, 200) + '...');
      
      const result = await model.current.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Gemini response received:', text.substring(0, 100) + '...');
      return text;
    } catch (error) {
      console.error('Gemini API error details:', error);
      
      // More specific error handling
      if (error.message.includes('API_KEY_INVALID')) {
        throw new Error('Invalid API key. Please check your Gemini API key.');
      } else if (error.message.includes('QUOTA_EXCEEDED')) {
        throw new Error('API quota exceeded. Please try again later.');
      } else if (error.message.includes('SAFETY')) {
        throw new Error('Content blocked by safety filters. Please rephrase your question.');
      } else {
        throw new Error(`Gemini API error: ${error.message}`);
      }
    }
  };

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Personal introduction responses
    if (input.includes('who is aadithyan') || input.includes('tell me about aadithyan') || input.includes('about aadithyan')) {
      return "Aadithyan is an exceptional Full Stack Developer with 2+ years of experience and a passion for creating innovative solutions. He's currently pursuing advanced studies at Masai School and holds a Diploma in Computer Hardware from the Department of Technical Education, Government of Kerala (2024). Aadithyan specializes in modern web technologies and has built impressive projects like CodeFit, Movie Trailer App, and Flipkart Clone. He's known for his problem-solving skills, attention to detail, and ability to learn new technologies quickly. What specific aspect of his background would you like to know more about?";
    }
    
    // Project responses - more personal
    if (input.includes('project') || input.includes('work') || input.includes('codefit') || input.includes('movie') || input.includes('flipkart')) {
      return "Aadithyan has built some incredible projects that showcase his full-stack expertise! His standout project is CodeFit - a sophisticated GitHub-based candidate recruiting platform that demonstrates his ability to work with complex data and user management. He also created a Movie Trailer App with seamless user experience, a Flipkart Clone showing e-commerce expertise, and a TicTacToe game displaying his problem-solving skills. Each project reflects his attention to detail, modern tech stack usage, and user-centric design approach. Which project interests you most? I can provide detailed insights about the technologies and challenges involved.";
    }
    
    // Skills responses - more personal
    if (input.includes('skill') || input.includes('technology') || input.includes('expertise') || input.includes('what can he do')) {
      return "Aadithyan is a versatile developer with expertise in 19+ technologies! His strongest areas include React, TypeScript, Node.js, MongoDB, and PostgreSQL. He's also skilled in modern technologies like Rust, Next.js, and has experience with both frontend and backend development. His skill progression shows continuous learning - from foundational languages to advanced frameworks. He's particularly strong in creating responsive, user-friendly interfaces and building scalable backend systems. What specific technology or skill area would you like me to elaborate on?";
    }
    
    // Experience responses - more personal
    if (input.includes('experience') || input.includes('background') || input.includes('career') || input.includes('journey')) {
      return "Aadithyan's journey is impressive! With 2+ years of hands-on development experience, he's built a solid foundation in full-stack development. His educational background includes advanced studies at Masai School and a Diploma in Computer Hardware, giving him both theoretical knowledge and practical skills. His experience spans multiple domains - from web applications to system-level understanding. He's known for his ability to quickly adapt to new technologies and deliver high-quality solutions. His portfolio demonstrates consistent growth and learning. What aspect of his professional journey interests you most?";
    }
    
    // Contact and hiring responses - more personal
    if (input.includes('contact') || input.includes('hire') || input.includes('recruit') || input.includes('opportunity')) {
      return "Aadithyan is actively seeking new opportunities and would be thrilled to connect! You can reach him through GitHub (@Aadithyanas) to see his code quality and contributions, LinkedIn for professional networking, or email (adithyanas2694@gmail.com) for direct communication. His resume is available for download and contains detailed information about his projects and skills. He's particularly interested in roles that challenge his technical abilities and allow him to contribute to meaningful projects. Would you like me to provide more specific information about his availability or preferred work arrangements?";
    }
    
    // Personal greeting responses
    if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('greetings')) {
      return "Hello! I'm NEXAA, Aadithyan's personal AI assistant. It's great to meet you! I'm here to represent Aadithyan professionally and answer any questions about his skills, projects, experience, or career. I know everything about his work and can provide detailed insights. What would you like to know about Aadithyan?";
    }
    
    // Help responses - more personal
    if (input.includes('help') || input.includes('what can you do') || input.includes('capabilities')) {
      return "As Aadithyan's personal AI assistant, I can help you with: 1) Detailed project explanations and technical insights, 2) Comprehensive skill breakdowns and expertise areas, 3) Professional background and experience details, 4) Career journey and achievements, 5) Contact information and collaboration opportunities, 6) Technical recommendations and advice, and 7) Portfolio navigation and highlights. I'm here to represent Aadithyan professionally and provide any information you need about his work. What would you like to explore?";
    }
    
    // Specific technology responses
    if (input.includes('react') || input.includes('typescript') || input.includes('node') || input.includes('mongodb')) {
      return "Aadithyan has excellent expertise in these technologies! He's particularly strong in React for building dynamic user interfaces, TypeScript for type-safe development, Node.js for scalable backend solutions, and MongoDB for efficient data management. His projects demonstrate practical application of these technologies with clean, maintainable code. He's always learning new features and best practices to improve his development workflow. Which specific technology would you like me to elaborate on?";
    }
    
    // Python and other technologies
    if (input.includes('python') || input.includes('java') || input.includes('c++') || input.includes('php')) {
      return "While Aadithyan's primary expertise is in modern web technologies like React, TypeScript, Node.js, and MongoDB, he has foundational knowledge in Python and other programming languages. His focus is on full-stack web development with JavaScript-based technologies, but he's always eager to learn new languages and frameworks. His current projects showcase his strength in React ecosystem, TypeScript, and modern backend technologies. Would you like to know more about his specific web development skills or any particular technology he's working with?";
    }
    
    // Specific project responses
    if (input.includes('codefit') || input.includes('movie app') || input.includes('flipkart clone') || input.includes('tic tac toe')) {
      return "Aadithyan's projects showcase his diverse skill set! CodeFit demonstrates his full-stack capabilities with GitHub integration and user management. The Movie Trailer App shows his frontend expertise and API integration skills. The Flipkart Clone reflects his e-commerce understanding and complex state management. The TicTacToe game displays his problem-solving and game logic implementation. Each project has unique challenges that Aadithyan solved creatively. Which project would you like me to explain in detail?";
    }
    
    // Personal responses about Aadithyan
    if (input.includes('aadithyan') || input.includes('he') || input.includes('his')) {
      return "Aadithyan is a dedicated and skilled developer who takes pride in his work. He's known for his problem-solving abilities, clean code practices, and continuous learning mindset. His projects reflect his attention to detail and user experience focus. He's always eager to take on new challenges and contribute to meaningful projects. What specific aspect of Aadithyan's work or personality would you like to know more about?";
    }
    
    // Default responses - more personal
    const responses = [
      "That's a great question about Aadithyan! Based on his portfolio and experience, I can see he has strong technical skills and a passion for development. Could you be more specific about what you'd like to know about him?",
      "I'd be happy to help you learn more about Aadithyan! His portfolio contains detailed information about his projects, skills, and experience. What specific aspect would you like me to explain?",
      "Excellent question! Aadithyan's portfolio showcases a talented full-stack developer with expertise in modern technologies. Is there a particular project, skill, or aspect of his work you'd like me to discuss in detail?",
      "I can help you understand more about Aadithyan's capabilities and experience. What specific information are you looking for about his work?",
      "That's an interesting point! Aadithyan's portfolio demonstrates both technical excellence and practical project experience. What would you like to explore further about his skills or projects?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: "Hello! I'm NEXAA, Aadithyan's personal AI assistant. I know everything about his skills, projects, and experience. I'm here to represent him professionally and answer any questions about his work. What would you like to know about Aadithyan?",
        timestamp: new Date()
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20, rotateY: -15 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          rotateY: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.6
          }
        }}
        exit={{ 
          opacity: 0, 
          scale: 0.8, 
          y: 20, 
          rotateY: 15,
          transition: { duration: 0.3 }
        }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        className={`fixed bottom-4 right-4 z-50 ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        }`}
      >
        <div className={`rounded-2xl shadow-2xl border transition-all duration-300 ${
          isDark 
            ? 'bg-gray-900 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          {/* Header */}
          <motion.div 
            className={`flex items-center justify-between p-4 rounded-t-2xl ${
              isDark 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="w-8 h-8 text-white" />
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse ${
                  isGeminiEnabled ? 'bg-green-400' : 'bg-yellow-400'
                }`}></div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">NEXAA</h3>
                <p className="text-blue-100 text-xs">
                  {isGeminiEnabled ? 'AI Assistant (Gemini)' : 'AI Assistant (Fallback)'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-lg transition-colors ${
                  isMuted ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4 text-white" /> : <Minimize2 className="w-4 h-4 text-white" />}
              </button>
              <button
                onClick={onToggle}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <motion.div 
                className={`h-96 overflow-y-auto p-4 space-y-4 ${
                  isDark ? 'bg-gray-900' : 'bg-gray-50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        delay: index * 0.1
                      }
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-[80%] ${
                      message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      {message.type === 'ai' && (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isDark ? 'bg-blue-600' : 'bg-blue-500'
                        }`}>
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <motion.div 
                        className={`px-4 py-2 rounded-2xl ${
                          message.type === 'user'
                            ? isDark
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-500 text-white'
                            : isDark
                              ? 'bg-gray-800 text-gray-100'
                              : 'bg-white text-gray-900 border border-gray-200'
                        }`}
                        whileHover={{ 
                          scale: 1.05,
                          transition: { duration: 0.2 }
                        }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 300,
                          damping: 25
                        }}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </motion.div>
                      {message.type === 'user' && (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isDark ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                          <MessageCircle className="w-4 h-4 text-gray-600" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }
                    }}
                    className="flex justify-start"
                  >
                    <div className="flex gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isDark ? 'bg-blue-600' : 'bg-blue-500'
                      }`}>
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className={`px-4 py-2 rounded-2xl ${
                        isDark ? 'bg-gray-800' : 'bg-white border border-gray-200'
                      }`}>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </motion.div>

              {/* Input */}
              <motion.div 
                className={`p-4 border-t ${
                  isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <motion.textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask NEXAA about Aadithyan"
                      className={`w-full px-4 py-3 pr-12 rounded-xl border resize-none ${
                        isDark 
                          ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      rows="1"
                      style={{ minHeight: '48px', maxHeight: '120px' }}
                      whileFocus={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    />
                    <motion.button
                      onClick={handleVoiceInput}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                        isListening
                          ? 'bg-red-500 text-white'
                          : isDark
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </motion.button>
                  </div>
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className={`px-4 py-3 rounded-xl transition-all duration-200 ${
                      inputValue.trim()
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : isDark
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={{ 
                      scale: inputValue.trim() ? 1.05 : 1,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Press Enter to send, Shift+Enter for new line
                  </p>
                  <button
                    onClick={clearChat}
                    className={`text-xs px-2 py-1 rounded ${
                      isDark 
                        ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Clear chat
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NEXAA;
