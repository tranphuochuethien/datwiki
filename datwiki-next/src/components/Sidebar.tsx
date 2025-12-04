"use client";

import React, { useState, useEffect } from 'react';
import {
    PanelLeftClose, PanelLeftOpen, Home, Compass, Bookmark, Users,
    TrendingUp, Sparkles, ArrowUpRight, Tag, Zap
} from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [topics, setTopics] = useState<any[]>([]);
    const [tags, setTags] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [topicsRes, tagsRes] = await Promise.all([
                    fetch('http://localhost:8000/api/topics/'),
                    fetch('http://localhost:8000/api/tags/')
                ]);

                if (topicsRes.ok) {
                    const topicsData = await topicsRes.json();
                    setTopics(topicsData);
                }

                if (tagsRes.ok) {
                    const tagsData = await tagsRes.json();
                    setTags(tagsData);
                }
            } catch (error) {
                console.error("Failed to fetch sidebar data:", error);
            }
        };

        fetchData();
    }, []);

    const getColorClass = (color: string) => {
        const map: Record<string, string> = {
            blue: "bg-blue-500",
            green: "bg-green-500",
            purple: "bg-purple-500",
            orange: "bg-orange-500",
            pink: "bg-pink-500",
            red: "bg-red-500",
            yellow: "bg-yellow-500",
            teal: "bg-teal-500",
        };
        return map[color] || "bg-slate-500";
    };

    return (
        <aside
            className={`w-full lg:w-72 flex-shrink-0 hidden lg:block sticky top-24 self-start transition-all duration-300 overflow-hidden ${isCollapsed ? 'collapsed !w-20' : ''}`}
            id="sidebar"
        >
            <div className="pr-4 pb-10">

                {/* Toggle Button */}
                <div className="flex justify-end mb-2">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-brand-600 transition"
                        title={isCollapsed ? "Mở rộng" : "Thu gọn"}
                    >
                        {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
                    </button>
                </div>

                {/* Navigation Menu */}
                <div className="mb-8">
                    <nav className="space-y-1">
                        <Link href="#" className="sidebar-link group flex items-center px-3 py-2 text-sm font-medium bg-brand-50 text-brand-700 rounded-lg">
                            <Home className={`sidebar-icon mr-3 h-5 w-5 text-brand-600 flex-shrink-0 ${isCollapsed ? 'mr-0' : ''}`} />
                            <span className={`sidebar-text whitespace-nowrap ${isCollapsed ? 'hidden' : ''}`}>Trang chủ</span>
                        </Link>
                        <Link href="/discover" className="sidebar-link group flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-brand-700 rounded-lg transition-colors">
                            <Compass className={`sidebar-icon mr-3 h-5 w-5 text-slate-400 group-hover:text-brand-600 transition-colors flex-shrink-0 ${isCollapsed ? 'mr-0' : ''}`} />
                            <span className={`sidebar-text whitespace-nowrap ${isCollapsed ? 'hidden' : ''}`}>Khám phá</span>
                        </Link>
                        <Link href="#" className="sidebar-link group flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-brand-700 rounded-lg transition-colors">
                            <Bookmark className={`sidebar-icon mr-3 h-5 w-5 text-slate-400 group-hover:text-brand-600 transition-colors flex-shrink-0 ${isCollapsed ? 'mr-0' : ''}`} />
                            <span className={`sidebar-text whitespace-nowrap ${isCollapsed ? 'hidden' : ''}`}>Đã lưu</span>
                        </Link>
                        <Link href="#" className="sidebar-link group flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-brand-700 rounded-lg transition-colors">
                            <Users className={`sidebar-icon mr-3 h-5 w-5 text-slate-400 group-hover:text-brand-600 transition-colors flex-shrink-0 ${isCollapsed ? 'mr-0' : ''}`} />
                            <span className={`sidebar-text whitespace-nowrap ${isCollapsed ? 'hidden' : ''}`}>Cộng đồng</span>
                        </Link>
                    </nav>
                </div>

                {/* Wrapper for Widgets (Hidden when collapsed) */}
                <div className={`sidebar-widgets space-y-8 ${isCollapsed ? 'hidden' : ''}`}>

                    {/* Topics List */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Chủ đề</h3>
                        <nav className="space-y-1">
                            {topics.map((topic) => (
                                <Link key={topic.id} href="#" className="group flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-brand-700 rounded-lg transition-colors">
                                    <div className="flex items-center">
                                        <span className={`w-2 h-2 rounded-full mr-3 ${getColorClass(topic.color)}`}></span>
                                        <span className="whitespace-nowrap">{topic.name}</span>
                                    </div>
                                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full group-hover:bg-brand-100 group-hover:text-brand-700">0</span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="border-t border-slate-100 pt-6"></div>

                    {/* Trending Widget */}
                    <div>
                        <div className="flex items-center justify-between mb-4 px-2">
                            <h3 className="font-bold text-slate-900 flex items-center">
                                <TrendingUp className="w-4 h-4 mr-2 text-brand-600" />
                                Xu hướng
                            </h3>
                            <button
                                onClick={() => (document.getElementById('ai-modal') as HTMLDialogElement)?.showModal()}
                                className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-md hover:bg-pink-200 transition flex items-center gap-1 font-medium"
                                title="Phân tích xu hướng bằng AI"
                            >
                                <Sparkles className="w-3 h-3" /> Phân tích
                            </button>
                        </div>
                        <ul className="space-y-2" id="trending-list">
                            <li>
                                <Link href="#" className="block px-3 py-2 rounded-lg hover:bg-slate-50 group">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-slate-700 group-hover:text-brand-700">Deploy Docker</span>
                                        <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover:text-brand-600" />
                                    </div>
                                    <span className="text-xs text-slate-400">2.4k lượt tìm kiếm</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="block px-3 py-2 rounded-lg hover:bg-slate-50 group">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-slate-700 group-hover:text-brand-700">Lộ trình ReactJS</span>
                                        <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover:text-brand-600" />
                                    </div>
                                    <span className="text-xs text-slate-400">1.8k lượt tìm kiếm</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Tags */}
                    <div>
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center px-2">
                            <Tag className="w-4 h-4 mr-2 text-brand-600" />
                            Tags phổ biến
                        </h3>
                        <div className="flex flex-wrap gap-2 px-2">
                            {tags.map((tag) => (
                                <Link key={tag.id} href="#" className="px-2.5 py-1 bg-white border border-slate-200 hover:border-brand-500 hover:text-brand-700 text-slate-600 rounded-md text-xs font-medium transition">
                                    #{tag.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Promo Box */}
                    <div className="px-2">
                        <div className="bg-gradient-to-br from-brand-700 to-brand-900 p-4 rounded-xl shadow-lg text-white text-center">
                            <Zap className="w-6 h-6 mx-auto mb-2 text-brand-200" />
                            <h3 className="font-bold text-sm mb-1">Nâng cấp Pro</h3>
                            <p className="text-brand-200 text-xs mb-3">Truy cập không giới hạn tài liệu cao cấp.</p>
                            <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-1.5 rounded-lg text-xs font-bold transition">Xem gói cước</button>
                        </div>
                    </div>
                </div>

            </div>
        </aside>
    );
}
