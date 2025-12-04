from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

class Topic(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    color = models.CharField(max_length=50, default="blue", help_text="Color name or hex code for UI")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Article(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    excerpt = models.TextField(help_text="Short summary for list view")
    content = models.TextField()
    image = models.URLField(blank=True, help_text="URL to the article thumbnail")

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="articles")
    category = models.ForeignKey(Topic, on_delete=models.SET_NULL, null=True, related_name="articles")
    tags = models.ManyToManyField(Tag, blank=True, related_name="articles")

    read_time = models.CharField(max_length=20, help_text="e.g. '5 min read'")
    likes = models.PositiveIntegerField(default=0)

    # Simple view count or fake comment count for UI matching
    views = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
