"use client";

import React, { useState } from 'react';
import { Bot, X, Sparkles, Send } from 'lucide-react';
import { marked } from 'marked';

export default function AIChatModal() {
    const [isOpen, setIsOpen] = useState(false); // This state might be controlled by parent or context in real app
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // In a real app, we'd use a context or global state store to toggle this modal
    // For now, we'll rely on the class 'hidden' toggle via DOM or similar mechanism if not fully React-ified
    // But since we are moving to Next.js, let's assume this component is always mounted but conditionally rendered or hidden via CSS

    const handleSend = async () => {
        if (!input.trim()) return;
        setIsLoading(true);
        setResponse('');

        // Simulation of API call
        setTimeout(() => {
            setResponse(marked.parse(`**AI Response:**\n\nYou asked: "${input}". \n\nThis is a simulated response. In a real application, this would call the Gemini API.`) as string);
            setIsLoading(false);
        }, 1000);
    };

    const closeDialog = () => {
        const dialog = document.getElementById('ai-modal') as HTMLDialogElement | null;
        dialog?.close();
    };

    return (
        <dialog
            id="ai-modal"
            className="m-auto fixed inset-0 bg-transparent p-0 backdrop:bg-slate-900/60 backdrop:backdrop-blur-sm open:animate-in open:fade-in open:zoom-in-95 outline-none rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative max-h-[85vh]"
            onClick={(e) => {
                const dialog = e.currentTarget;
                const rect = dialog.getBoundingClientRect();
                const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                    rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
                if (!isInDialog) {
                    dialog.close();
                }
            }}
        >
            <div className="bg-white w-full h-full flex flex-col">
                <div className="bg-gradient-to-r from-brand-700 to-purple-800 p-4 sm:p-6 text-white flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Trợ lý DatWiki AI</h3>
                            <p className="text-brand-100 text-sm">Hỏi tôi bất cứ điều gì về công nghệ...</p>
                        </div>
                    </div>
                    <button onClick={closeDialog} className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1 bg-slate-50 text-slate-700 text-base leading-relaxed custom-scrollbar">
                    {!response && !isLoading && (
                        <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 py-10">
                            <Sparkles className="w-12 h-12 mb-4 text-brand-300" />
                            <p className="mb-2 font-medium">Bạn muốn tìm hiểu về điều gì hôm nay?</p>
                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                                <button onClick={() => setInput('Giải thích Docker cho người mới bắt đầu')} className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:border-brand-400 hover:text-brand-600 transition">Giải thích Docker</button>
                                <button onClick={() => setInput('So sánh ReactJS và VueJS')} className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:border-brand-400 hover:text-brand-600 transition">React vs Vue</button>
                                <button onClick={() => setInput('Viết dàn ý bài viết về UX Design')} className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:border-brand-400 hover:text-brand-600 transition">Dàn ý UX Design</button>
                            </div>
                        </div>
                    )}

                    {isLoading && (
                        <div className="flex flex-col items-center justify-center py-10">
                            <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-3"></div>
                            <p className="text-sm text-slate-500 animate-pulse">Đang suy nghĩ...</p>
                        </div>
                    )}

                    {response && (
                        <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: response }}></div>
                    )}
                </div>

                <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
                            placeholder="Nhập câu hỏi của bạn..."
                        />
                        <button onClick={handleSend} className="absolute right-2 top-2 p-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 text-center">Powered by Google Gemini. Thông tin có thể không chính xác hoàn toàn.</p>
                </div>
            </div>
        </dialog>
    );
}
