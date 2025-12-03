"use client";

import React, { useState } from 'react';
import { Menu, Search, Sparkles, Bell, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo & Hamburger */}
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-md text-slate-500 lg:hidden hover:bg-slate-100 mr-2"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                            <img src="/logo.png" alt="DatWiki Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-brand-700/30 object-cover" />
                            <span className="font-bold text-xl tracking-tight text-slate-900">DatWiki</span>
                        </Link>
                    </div>

                    {/* Desktop Search */}
                    <div className="hidden lg:flex flex-1 items-center justify-center px-8">
                        <div className="relative w-full max-w-lg">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-full leading-5 bg-slate-50 placeholder-slate-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition duration-150 ease-in-out"
                                placeholder="Tìm kiếm kiến thức..."
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <span className="text-xs text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">⌘K</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => (document.getElementById('ai-modal') as HTMLDialogElement)?.showModal()}
                            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:from-pink-600 hover:to-rose-600 transition shadow-md shadow-pink-500/30 animate-pulse-slow"
                        >
                            <Sparkles className="w-4 h-4" />
                            Hỏi AI
                        </button>

                        <button className="p-2 text-slate-500 hover:text-brand-700 transition relative">
                            <Bell size={24} />
                            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="hidden sm:flex items-center gap-3 border-l pl-4 border-slate-200">
                            <button className="text-sm font-medium text-slate-600 hover:text-brand-700">Đăng nhập</button>
                            <button className="bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-800 transition shadow-md shadow-brand-700/30">
                                Tạo bài viết
                            </button>
                        </div>
                        <button className="lg:hidden p-2 text-slate-500"><Search size={24} /></button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden border-t border-slate-200 bg-white">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-700 hover:bg-slate-50">Trang chủ</Link>
                        <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-700 hover:bg-slate-50">Khám phá</Link>
                        <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-700 hover:bg-slate-50">Đã lưu</Link>
                        <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-700 hover:bg-slate-50">Cộng đồng</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
