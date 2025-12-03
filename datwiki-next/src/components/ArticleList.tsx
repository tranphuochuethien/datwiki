import React from 'react';
import { Clock, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function ArticleList() {
    const articles = [
        {
            category: "Lập trình",
            categoryColor: "text-brand-700",
            readTime: "5 phút đọc",
            title: "Tối ưu hóa hiệu năng JavaScript: Deep Dive",
            excerpt: "Khám phá các kỹ thuật nâng cao như V8 engine optimization, memory leaks handling và cách viết code JS hiệu quả hơn.",
            author: "Minh Tuấn",
            likes: 45,
            comments: 12,
            image: "https://placehold.co/160x120/f3e8ff/6d28d9?text=JS+Core"
        },
        {
            category: "Thiết kế",
            categoryColor: "text-purple-600",
            readTime: "8 phút đọc",
            title: "Xu hướng UI Glassmorphism: Có còn hot năm 2024?",
            excerpt: "Phân tích sự phát triển của phong cách thiết kế kính mờ và cách áp dụng nó một cách tinh tế vào sản phẩm thực tế.",
            author: "Lan Anh",
            likes: 128,
            comments: 34,
            image: "https://placehold.co/160x120/ede9fe/7c3aed?text=UI+Trend"
        },
        {
            category: "Backend",
            categoryColor: "text-green-600",
            readTime: "12 phút đọc",
            title: "Microservices vs Monolith: Khi nào nên chuyển đổi?",
            excerpt: "Đừng chạy theo xu hướng mù quáng. Bài viết phân tích chi phí, lợi ích và những thách thức thực tế khi chia nhỏ hệ thống.",
            author: "Đức Thắng",
            likes: 89,
            comments: 21,
            image: "https://placehold.co/160x120/dcfce7/166534?text=Microservices"
        },
        {
            category: "Marketing",
            categoryColor: "text-orange-600",
            readTime: "6 phút đọc",
            title: "Tâm lý học màu sắc trong Branding năm 2024",
            excerpt: "Màu tím không chỉ là sự sang trọng. Tìm hiểu cách các thương hiệu lớn sử dụng màu sắc để điều hướng cảm xúc khách hàng.",
            author: "Hải Yến",
            likes: 56,
            comments: 8,
            image: "https://placehold.co/160x120/ffedd5/c2410c?text=Color+Psych"
        }
    ];

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
                            <img src={article.image} alt="Thumbnail" className="w-full sm:w-40 h-32 object-cover transform group-hover:scale-105 transition duration-500" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`${article.categoryColor} font-bold text-xs uppercase tracking-wider`}>{article.category}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span className="text-xs text-slate-500 flex items-center"><Clock className="w-3 h-3 mr-1" /> {article.readTime}</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition">
                                <Link href={`/articles/${encodeURIComponent(article.title.replace(/\s+/g, '-'))}`}>{article.title}</Link>
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
