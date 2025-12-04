export const API_URL = 'http://localhost:8000/api';

export interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    category: string;
    categoryColor: string;
    readTime: string;
    likes: number;
    comments: number;
    views: number;
    created_at: string;
}

export interface Topic {
    id: number;
    name: string;
    slug: string;
    description: string;
    color: string;
}

export async function getArticles(): Promise<Article[]> {
    try {
        const res = await fetch(`${API_URL}/articles/`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch articles');
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}

export async function getTopics(): Promise<Topic[]> {
    try {
        const res = await fetch(`${API_URL}/topics/`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch topics');
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching topics:', error);
        return [];
    }
}
