import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 mt-12 pt-10 pb-6 reveal active">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <img src="/logo.png" alt="DatWiki Logo" className="w-6 h-6 rounded object-cover" />
                        <span className="font-bold text-slate-900">DatWiki &copy; 2024</span>
                    </div>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-brand-700 transition">Điều khoản</Link>
                        <Link href="#" className="hover:text-brand-700 transition">Bảo mật</Link>
                        <Link href="#" className="hover:text-brand-700 transition">Liên hệ</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
