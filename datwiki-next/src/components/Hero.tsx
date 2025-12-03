import React from 'react';
import { Terminal, Code, FileText } from 'lucide-react';

export default function Hero() {
    return (
        <div className="rounded-2xl p-8 mb-8 shadow-sm border border-brand-100 relative overflow-hidden group reveal active bg-tech-grid">
            <div className="absolute top-6 right-6 text-brand-100 opacity-60 font-bold text-7xl select-none animate-float" style={{ animationDelay: '0s' }}>&lt;/&gt;</div>
            <div className="absolute bottom-8 right-1/4 text-blue-100 opacity-60 font-bold text-5xl select-none animate-float" style={{ animationDelay: '2s' }}>{`{ }`}</div>
            <div className="absolute top-1/2 right-20 text-purple-100 opacity-50 font-bold text-3xl select-none animate-float" style={{ animationDelay: '1s' }}>0101</div>
            <div className="absolute -bottom-4 -left-4 text-green-50 opacity-40 font-bold text-9xl select-none animate-float" style={{ animationDelay: '3s' }}>#</div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-3 border border-blue-100">
                    <Terminal className="w-3 h-3" />
                    <span>Developer Mode: ON</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-3">
                    Chào buổi sáng!{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-600 ml-2">Sẵn sàng debug chưa?</span>
                </h1>
                <p className="text-slate-600 mb-6 text-lg">
                    Hệ thống DatWiki đã cập nhật thêm <span className="font-semibold text-brand-700 bg-brand-50 px-1 rounded">12 commit mới</span> trong kho kiến thức của bạn.
                </p>
                <div className="flex gap-3">
                    <button className="bg-brand-700 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-brand-800 transition shadow-lg shadow-brand-700/20 flex items-center group-hover:scale-105 duration-200">
                        <Code className="w-4 h-4 mr-2" />
                        Start Coding
                    </button>
                    <button className="bg-white border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg font-medium hover:bg-slate-50 hover:text-brand-700 hover:border-brand-300 transition flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        View Docs
                    </button>
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none"></div>
        </div>
    );
}
