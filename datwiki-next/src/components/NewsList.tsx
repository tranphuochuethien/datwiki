"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import Link from 'next/link';
import { API_URL } from '@/lib/api';

export default function NewsList() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [news, setNews] = useState<any[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`${API_URL}/articles/`);
                if (response.ok) {
                    const data = await response.json();
                    const mappedNews = data.map((article: any) => ({
                        type: article.category || 'General',
                        title: article.title,
                        time: new Date(article.created_at).toLocaleDateString('vi-VN'), // Simple formatting
                        slug: article.slug
                    }));
                    console.log("Fetched news:", mappedNews);
                    setNews(mappedNews);
                }
            } catch (error) {
                console.error("Failed to fetch news:", error);
            }
        };

        fetchNews();
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    if (news.length === 0) {
        return null;
    }

    return (
        <div className="mb-10 reveal active reveal-delay-200">
            <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-100 rounded-lg text-green-600">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Mới cập nhật</h2>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse ml-1"></div>
                </div>
            </div>

            <div
                ref={scrollRef}
                className={`flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar snap-x snap-mandatory select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {news.map((item, index) => (
                    <Link
                        key={index}
                        href={`/articles/${item.slug}`}
                        className="min-w-[280px] md:min-w-[320px] bg-white p-4 rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-md transition group snap-center pointer-events-none md:pointer-events-auto"
                        onClick={(e) => { if (isDragging) e.preventDefault(); }}
                    >
                        <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-2 block">{item.type}</span>
                        <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-brand-700 transition">{item.title}</h3>
                        <div className="flex items-center text-xs text-slate-400 mt-2">
                            <Calendar className="w-3 h-3 mr-1" /> {item.time}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
