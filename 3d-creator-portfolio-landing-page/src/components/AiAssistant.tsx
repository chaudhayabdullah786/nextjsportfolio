import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Bot,
  User,
} from 'lucide-react';
import { Project, Skill, Experience, Certificate } from '../data/portfolioData';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  certificates: Certificate[];
}

export const AiAssistant: React.FC<AiAssistantProps> = ({
  isOpen,
  onClose,
  projects,
  skills,
  experience,
  certificates,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: "Hello! I am Muhammad Abdullah's AI Assistant. Ask me anything about Muhammad Abdullah's machine learning projects, data analytics competencies, certifications, or Fiverr experience.",
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'What are your top ML projects?',
    'Tell me about your Fiverr experience',
    'Which certifications do you hold?',
    'What is your primary tech stack?',
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const query = userText.toLowerCase();

      if (query.includes('project') || query.includes('work') || query.includes('churn') || query.includes('vision')) {
        reply = `Muhammad Abdullah has ${projects.length} verified real-world projects in this portfolio. Highlights include:
1. Enterprise Customer Churn Predictive Platform (XGBoost & SHAP values with 89.2% ROC-AUC)
2. Healthcare Medical Imaging Anomaly Classifier (DenseNet-121 & Grad-CAM visual heatmaps)
3. Real-Time Financial Sentiment Intelligence (RoBERTa & FastAPI)
4. Automated E-Commerce Sales Forecasting Engine (Prophet & SARIMAX)
You can explore all ${projects.length} projects in the Featured Projects section!`;
      } else if (query.includes('fiverr') || query.includes('experience') || query.includes('job') || query.includes('role')) {
        const exp = experience[0];
        reply = `Muhammad Abdullah's active professional engagement is as a ${exp?.role} on ${exp?.company} (${exp?.period}).
He has delivered 30+ responsive web interfaces, custom Python web scrapers, and analytics reporting pipelines, reducing manual reporting time for clients by 65% with consistent 5-star feedback.`;
      } else if (query.includes('cert') || query.includes('deeplearning') || query.includes('ibm') || query.includes('google')) {
        reply = `Muhammad Abdullah holds ${certificates.length} verified certifications including:
- Machine Learning Specialization (DeepLearning.AI & Stanford Online)
- IBM Data Science Professional Certificate
- Google Data Analytics Professional Certificate
- Deep Learning Specialization (DeepLearning.AI)
- Microsoft Certified: Power BI Data Analyst Associate (PL-300)
- AWS Certified Cloud Practitioner
All ${certificates.length} certificates include verified credential IDs and downloadable proof.`;
      } else if (query.includes('skill') || query.includes('tech stack') || query.includes('python') || query.includes('sql')) {
        reply = `Muhammad Abdullah specializes across ${skills.length} technical competencies:
- Core Languages: Python (95%), SQL (91%), TypeScript, JavaScript
- AI & Deep Learning: Scikit-Learn (92%), PyTorch & TensorFlow (88%), NLP, OpenCV, Prompt Engineering
- Data Analytics & BI: Pandas/NumPy (94%), Power BI (90%), Matplotlib/Seaborn, Tableau
- Databases & Pipelines: PostgreSQL, Prisma, Docker, ETL Automation, FastAPI, React/Next.js.`;
      } else if (query.includes('contact') || query.includes('email') || query.includes('hire')) {
        reply = `You can get in touch with Muhammad Abdullah directly via email at abdullah.aiml.eng@gmail.com, or through LinkedIn at linkedin.com/in/muhammad-abdullah-aiml. He is currently available for select contracts and full-time roles.`;
      } else {
        reply = `Thank you for your interest! Muhammad Abdullah is a Data Analyst & AI/ML Engineer with ${projects.length} production projects, ${skills.length} validated technical skills, ${certificates.length} industry certifications, and 30+ client deliveries on Fiverr. How can he assist your team or project?`;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md h-full bg-[#0B1020] border-l border-[#94A3B8]/20 shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#94A3B8]/15 flex items-center justify-between bg-[#070A12]/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6366F1] to-[#22D3EE] p-[1.5px] flex items-center justify-center">
              <div className="w-full h-full bg-[#0B1020] rounded-[9px] flex items-center justify-center text-[#22D3EE]">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#F8FAFC]">
                  Abdullah AI Assistant
                </h3>
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              </div>
              <p className="text-[11px] text-[#7C879B]">
                Interactive Portfolio Companion
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#CBD5E1] hover:text-[#F8FAFC] hover:bg-[#101626] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-[#6366F1]/20 text-[#6366F1] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-[#6366F1] text-[#F8FAFC] rounded-tr-none'
                    : 'bg-[#101626] border border-[#94A3B8]/15 text-[#CBD5E1] rounded-tl-none'
                }`}
              >
                {msg.text}
                <div
                  className={`text-[9px] mt-1.5 ${
                    msg.sender === 'user' ? 'text-indigo-200' : 'text-[#7C879B]'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-[#22D3EE]/20 text-[#22D3EE] flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[#7C879B]">
              <Bot className="w-4 h-4 text-[#6366F1] animate-spin" />
              <span>Analyzing portfolio database...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-[#070A12]/40 border-t border-[#94A3B8]/10 flex flex-wrap gap-1.5">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleSend(prompt)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-[#101626] border border-[#94A3B8]/15 text-[#CBD5E1] hover:text-[#22D3EE] hover:border-[#22D3EE]/30 transition-all text-left"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-[#94A3B8]/15 bg-[#070A12]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills, ML stack..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#101626] border border-[#94A3B8]/20 text-xs text-[#F8FAFC] placeholder-[#7C879B] focus:outline-none focus:border-[#6366F1]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-[#6366F1] text-white hover:bg-[#4F46E5] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
