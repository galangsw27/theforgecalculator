import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles, Loader2, Maximize2, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { searchKnowledgeBase, formatContext } from '../utils/knowledgeBase';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'assistant', content: "Halo! Saya adalah **Asisten Forge**. Tanyakan apa saja tentang **ore**, **senjata**, musuh, atau mekanik game!" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Rate Limiting State
    const [requestCount, setRequestCount] = useState(0);
    const [resetTime, setResetTime] = useState(0);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Load rate limit state from localStorage on mount
    useEffect(() => {
        const storedCount = localStorage.getItem('chatRequestCount');
        const storedResetTime = localStorage.getItem('chatResetTime');

        if (storedCount && storedResetTime) {
            const now = Date.now();
            const rTime = parseInt(storedResetTime, 10);

            if (now > rTime) {
                // Reset if time has passed
                setRequestCount(0);
                setResetTime(0);
                localStorage.removeItem('chatRequestCount');
                localStorage.removeItem('chatResetTime');
            } else {
                setRequestCount(parseInt(storedCount, 10));
                setResetTime(rTime);
            }
        }
    }, []);

    // Helper for retry logic
    // Helper for retry logic
    const retryWithBackoff = async <T,>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> => {
        try {
            return await fn();
        } catch (error: any) {
            if (retries === 0 || (error.status !== 503 && !error.message?.includes('503'))) throw error;

            console.log(`Retrying API call... Attempts left: ${retries}. Waiting ${delay}ms.`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return retryWithBackoff(fn, retries - 1, delay * 2);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        // Check Rate Limit
        const now = Date.now();
        if (resetTime > 0 && now > resetTime) {
            // Reset if time passed during session
            setRequestCount(0);
            setResetTime(0);
            localStorage.removeItem('chatRequestCount');
            localStorage.removeItem('chatResetTime');
        } else if (requestCount >= 5) {
            const errorMessage: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: "Maaf, batas pertanyaan Anda sudah habis (maksimal 5). Silakan tunggu 2 jam lagi atau hubungi [Admin](https://wa.me/6281226716818)"
            };
            setMessages(prev => [...prev, errorMessage]);
            return;
        }

        const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Update Rate Limit
        const newCount = requestCount + 1;
        setRequestCount(newCount);
        localStorage.setItem('chatRequestCount', newCount.toString());

        if (newCount === 1) {
            const newResetTime = now + (2 * 60 * 60 * 1000); // 2 hours
            setResetTime(newResetTime);
            localStorage.setItem('chatResetTime', newResetTime.toString());
        }

        try {
            // 1. Search Knowledge Base
            const contextResults = searchKnowledgeBase(userMessage.content);
            const contextText = formatContext(contextResults);

            // 2. Call OpenRouter API
            const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || '';

            if (apiKey) {
                try {
                    const prompt = `
Kamu adalah teman yang sangat paham tentang game Roblox "The Forge". Jawab pertanyaan user dengan cara yang santai, natural, dan seperti sedang ngobrol dengan teman.

Gunakan informasi dari wiki ini untuk menjawab:
${contextText}

Aturan menjawab:
- Jawab dengan bahasa yang natural dan friendly, seperti teman yang lagi bantu
- Jangan terlalu formal atau kaku
- Kalau ada info di wiki, jelaskan dengan cara yang mudah dimengerti
- Kalau tidak ada info yang cukup, bilang aja dengan jujur dan kasih saran untuk cek wiki langsung
- Boleh pakai emoji sesekali untuk lebih friendly 😊
- Jangan pakai format markdown yang berlebihan, cukup teks biasa yang enak dibaca
- Fokus kasih info yang berguna dan praktis

Pertanyaan: ${userMessage.content}
`;
                    // Create placeholder message for streaming
                    const botMessageId = (Date.now() + 1).toString();
                    setMessages(prev => [...prev, { id: botMessageId, role: 'assistant', content: '' }]);

                    // Call API with retry logic
                    await retryWithBackoff(async () => {
                        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${apiKey}`,
                                "Content-Type": "application/json",
                                "HTTP-Referer": window.location.origin,
                                "X-Title": "Fantasy Forge Calculator",
                            },
                            body: JSON.stringify({
                                "model": "google/gemini-2.5-flash",
                                "messages": [
                                    { "role": "user", "content": prompt }
                                ],
                                "stream": true
                            })
                        });

                        if (!response.ok) {
                            const errorData = await response.json().catch(() => ({}));
                            throw new Error(`API Error: ${response.status} ${JSON.stringify(errorData)}`);
                        }

                        if (!response.body) throw new Error("No response body");

                        const reader = response.body.getReader();
                        const decoder = new TextDecoder("utf-8");
                        let fullText = '';

                        while (true) {
                            const { done, value } = await reader.read();
                            if (done) break;

                            const chunk = decoder.decode(value, { stream: true });
                            const lines = chunk.split('\n').filter(line => line.trim() !== '');

                            for (const line of lines) {
                                if (line === 'data: [DONE]') return;
                                if (line.startsWith('data: ')) {
                                    try {
                                        const json = JSON.parse(line.substring(6));
                                        const content = json.choices[0]?.delta?.content || '';
                                        if (content) {
                                            fullText += content;
                                            setMessages(prev => prev.map(msg =>
                                                msg.id === botMessageId ? { ...msg, content: fullText } : msg
                                            ));
                                        }
                                    } catch (e) {
                                        console.error("Error parsing SSE message", e);
                                    }
                                }
                            }
                        }
                    });

                } catch (apiError) {
                    console.error("OpenRouter API Error:", apiError);
                    // Remove the empty placeholder if it exists and failed completely
                    setMessages(prev => prev.filter(msg => msg.content !== '' || msg.role !== 'assistant'));

                    const fallbackMessage: Message = {
                        id: Date.now().toString(),
                        role: 'assistant',
                        content: `**The Forge Assistant is having trouble connecting, but here is what I found in the wiki:**\n\n${contextText}`
                    };
                    setMessages(prev => [...prev, fallbackMessage]);
                }
            } else {
                const fallbackMessage: Message = {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: `**I found some information that might help:**\n\n${contextText}\n\n*(Note: Add VITE_OPENROUTER_API_KEY to .env for full AI responses)*`
                };
                setMessages(prev => [...prev, fallbackMessage]);
            }
        } catch (error) {
            console.error("Error in chat:", error);
            const errorMessage: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: "Maaf, ada masalah teknis. Coba tanya lagi ya!"
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-110 group"
            >
                {isOpen ? <X className="text-white" /> : <MessageSquare className="text-white" />}
                {!isOpen && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className={`fixed z-50 bg-[#0f172a] border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300 ${isExpanded
                    ? 'inset-4 md:inset-10 rounded-2xl'
                    : 'bottom-24 right-6 w-[450px] h-[600px] rounded-2xl'
                    }`}>

                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                                <Bot size={18} className="text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Forge Assistant</h3>
                                <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    Online
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                        >
                            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                                    }`}>
                                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                </div>
                                <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.role === 'user'
                                    ? 'bg-purple-600 text-white rounded-tr-none'
                                    : 'bg-white/10 text-gray-200 rounded-tl-none'
                                    }`}>


                                    <div className="prose prose-invert prose-sm max-w-none break-words">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2" {...props} />,
                                                ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                                                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                                a: ({ node, ...props }) => <a className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                                strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />,
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                    <Bot size={14} className="text-blue-400" />
                                </div>
                                <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 flex items-center gap-2">
                                    <Loader2 size={14} className="animate-spin text-gray-400" />
                                    <span className="text-xs text-gray-400">Sedang berpikir...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-white/10 bg-black/20">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Tanya tentang ore, senjata..."
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-gray-600"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 rounded-lg text-white hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                        <div className="text-[10px] text-center text-gray-600 mt-2">
                            Powered by Gemini AI & The Forge Wiki
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
