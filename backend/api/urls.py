from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, TopicViewSet, TagViewSet

router = DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'topics', TopicViewSet)
router.register(r'tags', TagViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
