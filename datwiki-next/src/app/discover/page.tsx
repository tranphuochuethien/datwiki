import React from 'react';
import Link from 'next/link';
import { Compass, Tag, Hash, BookOpen } from 'lucide-react';

async function getTopics() {
    const res = await fetch('http://localhost:8000/api/topics/', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
}

async function getTags() {
    const res = await fetch('http://localhost:8000/api/tags/', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
}

async function getArticles() {
    const res = await fetch('http://localhost:8000/api/articles/', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
}

export default async function DiscoverPage() {
    const [topics, tags, articles] = await Promise.all([
        getTopics(),
        getTags(),
        getArticles()
    ]);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <Compass className="w-8 h-8 text-brand-600" />
                    Khám phá
                </h1>
                <p className="text-slate-500 mt-2">Tìm kiếm nội dung theo chủ đề, thẻ hoặc xem tất cả bài viết.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Topics & Tags */}
                <div className="space-y-8">
                    {/* Topics */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-brand-600" />
                            Chủ đề
                        </h2>
                        <div className="space-y-2">
                            {topics.map((topic: any) => (
                                <Link key={topic.id} href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition group">
                                    <div className="flex items-center gap-3">
                                        <span className={`w-3 h-3 rounded-full ${getColorClass(topic.color)}`}></span>
                                        <span className="font-medium text-slate-700 group-hover:text-brand-700 transition">{topic.name}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Hash className="w-5 h-5 text-brand-600" />
                            Tags phổ biến
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag: any) => (
                                <Link key={tag.id} href="#" className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-brand-100 hover:text-brand-700 transition">
                                    #{tag.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: All Articles */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Tất cả bài viết</h2>
                    <div className="space-y-6">
                        {articles.map((article: any) => (
                            <Link key={article.id} href={`/articles/${article.slug}`} className="block bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-brand-200 transition group">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {article.image && (
                                        <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                                            <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-full">{article.category}</span>
                                            <span className="text-xs text-slate-400">{new Date(article.created_at).toLocaleDateString('vi-VN')}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition">{article.title}</h3>
                                        <p className="text-slate-500 text-sm line-clamp-2">{article.excerpt}</p>
                                        <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                                            <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {article.tags.length} tags</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
