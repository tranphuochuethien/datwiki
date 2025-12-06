'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { API_URL } from '@/lib/api';

// Dynamic import for Editor to avoid SSR issues with Quill
const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

interface Topic {
    id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
}

export default function CreateArticle() {
    const router = useRouter();
    const [topics, setTopics] = useState<Topic[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category_id: '',
        tag_ids: [] as string[],
        readTime: '',
        image: null as File | null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [topicsRes, tagsRes] = await Promise.all([
                    fetch(`${API_URL}/topics/`),
                    fetch(`${API_URL}/tags/`)
                ]);

                if (topicsRes.ok) {
                    const data = await topicsRes.json();
                    setTopics(data.results || data);
                }
                if (tagsRes.ok) {
                    const data = await tagsRes.json();
                    setTags(data.results || data);
                }
            } catch (err) {
                console.error('Failed to fetch data', err);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleContentChange = (content: string) => {
        setFormData(prev => ({ ...prev, content }));
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = e.target.options;
        const selectedTags: string[] = [];
        for (const option of options) {
            if (option.selected) {
                selectedTags.push(option.value);
            }
        }
        setFormData(prev => ({ ...prev, tag_ids: selectedTags }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFormData(prev => ({ ...prev, image: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const data = new FormData();
        data.append('title', formData.title);
        data.append('excerpt', formData.excerpt);
        data.append('content', formData.content);
        if (formData.category_id) {
            data.append('category_id', formData.category_id);
        }
        formData.tag_ids.forEach(tagId => data.append('tag_ids', tagId));
        data.append('readTime', formData.readTime);
        if (formData.image) {
            data.append('image_upload', formData.image);
        }

        try {
            // Note: Authentication is currently assumed to be handled by session or proxy.
            // Future improvement: Add explicit token handling if JWT is implemented.
            const res = await fetch(`${API_URL}/articles/`, {
                method: 'POST',
                body: data,
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(JSON.stringify(errData));
            }

            const createdArticle = await res.json();
            router.push(`/articles/${createdArticle.slug}`);
        } catch (err: any) {
            setError(err.message || 'Không thể tạo bài viết');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Tạo bài viết mới</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tiêu đề</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tóm tắt</label>
                    <textarea
                        id="excerpt"
                        name="excerpt"
                        required
                        value={formData.excerpt}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nội dung</label>
                    <div className="bg-white dark:bg-gray-800 rounded-lg">
                        <Editor
                            value={formData.content}
                            onChange={handleContentChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Danh mục</label>
                        <select
                            id="category"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Chọn danh mục</option>
                            {topics.map(topic => (
                                <option key={topic.id} value={topic.id}>{topic.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Thời gian đọc</label>
                        <input
                            id="readTime"
                            type="text"
                            name="readTime"
                            placeholder="VD: 5 phút đọc"
                            required
                            value={formData.readTime}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Thẻ (Giữ Ctrl/Cmd để chọn nhiều)</label>
                    <select
                        id="tags"
                        multiple
                        name="tag_ids"
                        value={formData.tag_ids}
                        onChange={handleTagChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 h-32"
                    >
                        {tags.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ảnh bìa</span>
                    <div className="flex items-center space-x-4">
                        <label className="cursor-pointer flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <Upload size={20} className="text-gray-500" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Tải ảnh lên</span>
                            <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                        </label>
                        {formData.image && (
                            <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                {formData.image.name}
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    <X size={16} />
                                </button>
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={20} className="animate-spin mr-2" />
                                Đang tạo...
                            </>
                        ) : (
                            'Tạo bài viết'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
