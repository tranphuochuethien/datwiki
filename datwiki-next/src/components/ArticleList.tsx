import React from 'react';
import { Clock, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import Link from 'next/link';
import { getArticles } from '@/lib/api';

export default async function ArticleList() {
    const articles = await getArticles();

    return (
        <div>
            <div className="flex items-center gap-3 mb-6 px-1 reveal active">
                <h2 className="text-xl font-bold text-slate-900">Bài viết dành cho bạn</h2>
                <span className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold">Mới</span>
            </div>

            <div className="space-y-4">
                {articles.map((article, index) => (
                    <article key={index} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-md transition flex flex-col sm:flex-row gap-6 group reveal active">
                        <div className="flex-shrink-0 relative overflow-hidden rounded-lg">
                            <img
                                src={article.image || "https://placehold.co/800x400/f3e8ff/6d28d9?text=Article+Cover"}
                                alt="Thumbnail"
                                className="w-full sm:w-40 h-32 object-cover transform group-hover:scale-105 transition duration-500"
                            />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`${article.categoryColor} font-bold text-xs uppercase tracking-wider`}>{article.category}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span className="text-xs text-slate-500 flex items-center"><Clock className="w-3 h-3 mr-1" /> {article.readTime}</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition">
                                <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                            </h3>
                            <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                                {article.excerpt}
                            </p>
                            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                                <div className="flex items-center gap-2">
                                    <img src="https://placehold.co/32x32" className="w-6 h-6 rounded-full border border-slate-200" alt="Avatar" />
                                    <span className="text-xs font-medium text-slate-700">{article.author}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400 text-xs">
                                    <span className="flex items-center hover:text-brand-600 transition"><ThumbsUp className="w-3 h-3 mr-1" /> {article.likes}</span>
                                    <span className="flex items-center hover:text-brand-600 transition"><MessageSquare className="w-3 h-3 mr-1" /> {article.comments}</span>
                                    <span className="flex items-center hover:text-brand-600 transition"><Share2 className="w-3 h-3" /></span>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
