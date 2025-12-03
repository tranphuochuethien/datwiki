"use client";

import React, { useRef, useState } from 'react';
import { LayoutGrid, ChevronRight, Code2, PenTool, Database, LineChart, Video } from 'lucide-react';
import Link from 'next/link';

export default function CategoryList() {
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

    const categories = [
        { icon: Code2, label: "Lập trình", color: "blue" },
        { icon: PenTool, label: "Thiết kế", color: "purple" },
        { icon: Database, label: "Dữ liệu", color: "green" },
        { icon: LineChart, label: "Marketing", color: "orange" },
        { icon: Video, label: "Media", color: "pink" },
    ];

    const getColorClasses = (color: string) => {
        const map: Record<string, string> = {
            blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
            purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600",
            green: "bg-green-50 text-green-600 group-hover:bg-green-600",
            orange: "bg-orange-50 text-orange-600 group-hover:bg-orange-600",
            pink: "bg-pink-50 text-pink-600 group-hover:bg-pink-600",
        };
        return map[color] || map.blue;
    };

    return (
        <div className="mb-10 reveal active reveal-delay-100">
            <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                        <LayoutGrid className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Danh mục phổ biến</h2>
                </div>
                <Link href="#" className="text-sm font-medium text-brand-700 hover:text-brand-800 flex items-center transition">
                    Xem tất cả <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
            </div>

            <div
                ref={scrollRef}
                className={`flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar snap-x snap-mandatory select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {categories.map((cat, index) => (
                    <Link
                        key={index}
                        href="#"
                        className="min-w-[160px] md:min-w-[180px] flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-xl hover:border-brand-400 hover:shadow-md hover:shadow-brand-100 transition group snap-center pointer-events-none md:pointer-events-auto"
                        onClick={(e) => { if (isDragging) e.preventDefault(); }}
                    >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 group-hover:text-white transition-all duration-300 ${getColorClasses(cat.color)}`}>
                            <cat.icon className="w-6 h-6" />
                        </div>
                        <span className="font-semibold text-slate-900">{cat.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
