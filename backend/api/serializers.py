from rest_framework import serializers
from .models import Article, Topic, Tag
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'name', 'slug', 'description', 'color', 'icon']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']

class ArticleSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username') # Return string to match frontend mock
    category = serializers.ReadOnlyField(source='category.name') # Return string to match frontend mock
    categoryColor = serializers.ReadOnlyField(source='category.color') # Match frontend camelCase
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Topic.objects.all(), source='category', write_only=True, required=False, allow_null=True
    )
    readTime = serializers.CharField(source='read_time') # Match frontend camelCase
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(), source='tags', write_only=True, many=True, required=False
    )
    comments = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image_upload:
            return obj.image_upload.url
        return obj.image
    
    def get_comments(self, obj):
        return 0 # Placeholder

    class Meta:
        model = Article
        fields = [
            'id', 'title', 'slug', 'excerpt', 'content', 'image', 'image_upload',
            'author',
            'category', 'categoryColor', 'category_id',
            'tags', 'tag_ids',
            'readTime', 'likes', 'comments', 'views', 'created_at', 'updated_at'
        ]
