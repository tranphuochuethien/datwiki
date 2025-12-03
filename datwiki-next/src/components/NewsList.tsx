"use client";

import React, { useRef, useState } from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function NewsList() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

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

    const news = [
        { type: "News", title: "React 19 Beta: Những tính năng đáng mong đợi nhất", time: "2 giờ trước" },
        { type: "Tutorial", title: "Hướng dẫn bảo mật API với JWT và Refresh Token", time: "4 giờ trước" },
        { type: "Resource", title: "Bộ UI Kit miễn phí cho dự án E-commerce 2024", time: "6 giờ trước" },
        { type: "Event", title: "Web Summit 2024: Tổng hợp các bài talk hay nhất", time: "1 ngày trước" },
    ];

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
                        href={`/articles/${encodeURIComponent(item.title.replace(/\s+/g, '-'))}`}
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
