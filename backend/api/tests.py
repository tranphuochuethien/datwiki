from django.test import TestCase
from django.contrib.auth.models import User
from .models import Topic, Article
from rest_framework.test import APIClient
from rest_framework import status

class ArticleApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='password')
        self.topic = Topic.objects.create(name='Test Topic', color='text-blue-500')
        self.article = Article.objects.create(
            title='Test Article',
            content='Test Content',
            author=self.user,
            category=self.topic,
            read_time='5 min read'
        )

    def test_get_articles(self):
        response = self.client.get('/api/articles/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Test Article')
        self.assertEqual(response.data[0]['category'], 'Test Topic')
