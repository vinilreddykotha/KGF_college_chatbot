import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Bot, User, Trash2, Sparkles, MessageSquare, 
  HelpCircle, RefreshCw, CheckCircle2, AlertCircle, CornerDownLeft, Info 
} from 'lucide-react';
import { processChatQuery } from '../utils/chatbotLogic';
import collegeData from '../data/collegeData.json';

export default function Chatbot({ externalQuery, onClearExternalQuery }) {
  const initialMessages = [
    {
      id: 1,
      sender: 'bot',
      text: "👋 **Hello and welcome to Chettinad Academy of Research and Education (CARE), KGF Campus!**\n\nI am your **AI College Enquiry Assistant**. You can ask me anything about:\n- 🚀 **B.Tech Engineering Courses** (CSE, AI&ML, ECE, VLSI)\n- 💰 **B.Tech 2026–27 Fee Packages** (starting from ₹7.40L for >85% in +2)\n- 🏥 **Medical & Allied Health Sciences** (B.Sc Allied Health, Nursing, BPT, BOT, B.Pharm)\n- 🏡 **Hostel Facilities & Inclusions**\n- 📝 **Admission Process & Eligibility**\n\nHow can I help you today? You can type your question below or click any of the quick buttons!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      topic: 'Welcome',
      suggestedQuestions: [
        "Which engineering courses are available?",
        "What is the fee for 80%?",
        "What medical courses are available?",
        "Is hostel included in the package?"
      ]
    }
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    // Scroll only inside the chat container, NOT the whole page
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle external query passed from hero or course cards
  useEffect(() => {
    if (externalQuery) {
      handleSendMessage(externalQuery);
      if (onClearExternalQuery) onClearExternalQuery();
    }
  }, [externalQuery]);

  const handleSendMessage = (textToSend = null) => {
    const query = typeof textToSend === 'string' ? textToSend.trim() : inputText.trim();
    if (!query) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (typeof textToSend !== 'string') {
      setInputText('');
    }

    // Show typing indicator
    setIsTyping(true);

    // Realistic brief delay for typing effect (350-500ms)
    setTimeout(() => {
      const response = processChatQuery(query);

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        topic: response.topic,
        category: response.category,
        found: response.found,
        confidence: response.confidence,
        suggestedQuestions: response.suggestedQuestions || []
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages(initialMessages);
    if (inputRef.current) inputRef.current.focus();
  };

  // Render markdown text (bolding, headers, lists, links) cleanly without heavy external libraries
  const renderFormattedText = (rawText) => {
    if (!rawText) return null;

    // Split text into lines
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();

      if (!trimmed) {
        return <div key={idx} className="chat-empty-line" />;
      }

      // Check for headers
      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={idx} className="chat-h4">
            {renderInlineMarkdown(trimmed.substring(4))}
          </h4>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h3 key={idx} className="chat-h3">
            {renderInlineMarkdown(trimmed.substring(3))}
          </h3>
        );
      }

      // Check for list items
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <div key={idx} className="chat-list-item">
            <span className="chat-bullet">•</span>
            <span>{renderInlineMarkdown(trimmed.substring(2))}</span>
          </div>
        );
      }

      // Check for numbered list (e.g. "1. ")
      const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (numMatch) {
        return (
          <div key={idx} className="chat-list-item">
            <span className="chat-num">{numMatch[1]}.</span>
            <span>{renderInlineMarkdown(numMatch[2])}</span>
          </div>
        );
      }

      // Standard paragraph
      return (
        <p key={idx} className="chat-p">
          {renderInlineMarkdown(trimmed)}
        </p>
      );
    });
  };

  // Inline formatting: **bold**, links [text](url)
  const renderInlineMarkdown = (text) => {
    const parts = [];
    let remaining = text;
    let keyIdx = 0;

    // Regex for links [title](url) or bold **bold**
    const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*)/;

    while (remaining) {
      const match = remaining.match(tokenRegex);
      if (!match) {
        parts.push(<span key={keyIdx++}>{remaining}</span>);
        break;
      }

      const matchIndex = match.index;
      if (matchIndex > 0) {
        parts.push(<span key={keyIdx++}>{remaining.substring(0, matchIndex)}</span>);
      }

      if (match[1].startsWith('[')) {
        // Link
        const linkText = match[2];
        const linkUrl = match[3];
        parts.push(
          <a
            key={keyIdx++}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-link"
          >
            {linkText}
          </a>
        );
      } else {
        // Bold
        const boldText = match[4];
        parts.push(<strong key={keyIdx++}>{boldText}</strong>);
      }

      remaining = remaining.substring(matchIndex + match[0].length);
    }

    return parts;
  };

  const quickQuestionsList = [
    "What courses are available?",
    "Tell me about B.Tech",
    "B.Tech fee structure",
    "How much is the CSE fee for students scoring above 85%?",
    "What is the fee for 80%?",
    "What if I score 70% in +2?",
    "Admission process",
    "Hostel facilities",
    "Is hostel included in the package?",
    "Is HCL training included?",
    "Medical courses",
    "Campus facilities",
    "Scholarships",
    "Placements",
    "Contact information"
  ];

  return (
    <section className="chatbot-section" id="chatbot-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-badge">Live Interactive Assistant</span>
          <h2 className="section-title">
            CARE KGF <span className="text-highlight">Enquiry Chatbot</span>
          </h2>
          <p className="section-subtitle">
            Ask any question about courses, eligibility, fee structures, hostel accommodation, or campus admissions in natural language.
          </p>
        </div>

        {/* Chatbot Interface Card */}
        <div className="chatbot-container-card">
          {/* Top Bar of Chat window */}
          <div className="chat-window-header">
            <div className="chat-bot-status">
              <div className="bot-avatar-frame">
                <Bot size={22} color="#ffffff" />
                <span className="status-indicator-dot online"></span>
              </div>
              <div className="bot-status-details">
                <div className="bot-name-row">
                  <h3 className="bot-name">CARE Virtual Admissions Assistant</h3>
                  <span className="bot-ai-tag">AI Powered</span>
                </div>
                <span className="bot-online-sub">Online • Ready to answer 24/7 • KGF Campus</span>
              </div>
            </div>

            <div className="chat-header-actions">
              <button
                className="btn-clear-chat"
                onClick={handleClearChat}
                title="Reset conversation"
              >
                <Trash2 size={15} />
                <span className="clear-text">Clear Chat</span>
              </button>
            </div>
          </div>

          {/* Quick Question Buttons Slider */}
          <div className="quick-questions-wrapper">
            <span className="quick-label">
              <Sparkles size={14} className="text-primary" />
              Quick Questions:
            </span>
            <div className="quick-chips-scroll">
              {quickQuestionsList.map((q, idx) => (
                <button
                  key={idx}
                  className="quick-chip"
                  onClick={() => handleSendMessage(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="chat-messages-area" ref={chatMessagesRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="message-avatar bot-avatar">
                    <Bot size={18} color="#ffffff" />
                  </div>
                )}

                <div className="message-content-wrapper">
                  {msg.sender === 'bot' && msg.topic && msg.topic !== 'Welcome' && (
                    <div className="bot-message-topic-tag">
                      <Sparkles size={12} />
                      <span>{msg.topic}</span>
                      {msg.confidence > 0 && (
                        <span className="confidence-pill">{msg.confidence}% match</span>
                      )}
                    </div>
                  )}

                  <div className={`message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                    <div className="bubble-text">
                      {msg.sender === 'bot' ? renderFormattedText(msg.text) : msg.text}
                    </div>
                    <span className="message-timestamp">{msg.timestamp}</span>
                  </div>

                  {/* Follow-up suggestions for bot messages */}
                  {msg.sender === 'bot' && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="msg-suggested-prompts">
                      <span className="suggested-title">Related questions:</span>
                      <div className="suggested-chips">
                        {msg.suggestedQuestions.map((sq, i) => (
                          <button
                            key={i}
                            className="suggested-chip"
                            onClick={() => handleSendMessage(sq)}
                          >
                            <MessageSquare size={12} />
                            <span>{sq}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="message-avatar user-avatar">
                    <User size={18} color="#ffffff" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="chat-message-row bot-row">
                <div className="message-avatar bot-avatar">
                  <Bot size={18} color="#ffffff" />
                </div>
                <div className="message-bubble bot-bubble typing-bubble">
                  <div className="typing-dots">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <span className="typing-text">Assistant is finding answer...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="chat-input-bar">
            <div className="input-field-wrapper">
              <input
                ref={inputRef}
                type="text"
                className="chat-text-input"
                placeholder="Ask about courses, B.Tech fee for 80%, hostels, eligibility, admissions..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
              />
              <button
                className={`btn-chat-send ${inputText.trim() ? 'active' : ''}`}
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isTyping}
                aria-label="Send Message"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="input-helper-note">
              <span>Press <strong>Enter ↵</strong> to send • Natural language recognition enabled</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
