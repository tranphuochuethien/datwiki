import React from 'react';
import { Clock, Calendar, User, ArrowLeft, Share2, Bookmark, ThumbsUp, MessageSquare } from 'lucide-react';
import Link from 'next/link';

import { notFound } from 'next/navigation';

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let article;
    try {
        const res = await fetch(`http://localhost:8000/api/articles/${slug}/`, { cache: 'no-store' });

        if (!res.ok) {
            notFound();
        }

        const data = await res.json();
        article = {
            title: data.title,
            author: data.author,
            date: new Date(data.created_at).toLocaleDateString('vi-VN'),
            readTime: data.readTime,
            category: data.category,
            content: data.content,
            image: data.image || "https://placehold.co/800x400/f3e8ff/6d28d9?text=Article+Cover",
            tags: data.tags || []
        };
    } catch (error) {
        console.error("Error fetching article:", error);
        notFound();
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Header Image */}
            <div className="relative h-64 md:h-96 w-full">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 max-w-4xl mx-auto">
                    <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại trang chủ
                    </Link>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="bg-brand-600 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{article.category}</span>
                        <span className="text-white/80 text-sm flex items-center"><Clock className="w-3 h-3 mr-1" /> {article.readTime}</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">{article.title}</h1>
                    <div className="flex items-center gap-4 text-white/90">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <User className="w-4 h-4" />
                            </div>
                            <span className="font-medium text-sm">{article.author}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{article.date}</span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
                    {/* Actions Bar */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 text-slate-500 hover:text-brand-600 transition">
                                <ThumbsUp className="w-5 h-5" /> <span className="text-sm font-medium">128</span>
                            </button>
                            <button className="flex items-center gap-2 text-slate-500 hover:text-brand-600 transition">
                                <MessageSquare className="w-5 h-5" /> <span className="text-sm font-medium">34</span>
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition" title="Lưu bài viết">
                                <Bookmark className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition" title="Chia sẻ">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-slate prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }}>
                    </div>

                    {/* Tags */}
                    <div className="mt-10 pt-6 border-t border-slate-100">
                        <h3 className="text-sm font-bold text-slate-900 mb-3">Tags:</h3>
                        <div className="flex flex-wrap gap-2">
                            {article.tags && article.tags.length > 0 ? (
                                article.tags.map((tag: any) => (
                                    <Link key={tag.id} href="#" className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm hover:bg-brand-100 hover:text-brand-700 transition">
                                        #{tag.name}
                                    </Link>
                                ))
                            ) : (
                                <span className="text-slate-500 italic">No tags</span>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
