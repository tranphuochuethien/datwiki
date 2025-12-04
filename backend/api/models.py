from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

class Topic(models.Model):
    COLOR_CHOICES = [
        ('blue', 'Blue'),
        ('green', 'Green'),
        ('purple', 'Purple'),
        ('orange', 'Orange'),
        ('pink', 'Pink'),
        ('red', 'Red'),
        ('yellow', 'Yellow'),
        ('teal', 'Teal'),
    ]

    name = models.CharField(max_length=100, verbose_name="Tên chủ đề")
    slug = models.SlugField(unique=True, blank=True, verbose_name="Slug")
    description = models.TextField(blank=True, verbose_name="Mô tả")
    icon = models.CharField(max_length=50, default='Code2', verbose_name="Biểu tượng")
    color = models.CharField(max_length=50, choices=COLOR_CHOICES, default="blue", verbose_name="Màu sắc")

    class Meta:
        verbose_name = "Chủ đề"
        verbose_name_plural = "Chủ đề"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=50, verbose_name="Tên thẻ")
    slug = models.SlugField(unique=True, blank=True, verbose_name="Slug")

    class Meta:
        verbose_name = "Thẻ"
        verbose_name_plural = "Thẻ"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

from ckeditor.fields import RichTextField

class Article(models.Model):
    title = models.CharField(max_length=200, verbose_name="Tiêu đề")
    slug = models.SlugField(unique=True, blank=True, verbose_name="Slug")
    excerpt = models.TextField(help_text="Short summary for list view", verbose_name="Tóm tắt")
    content = RichTextField(verbose_name="Nội dung")
    image = models.URLField(blank=True, help_text="URL to the article thumbnail", verbose_name="Link ảnh (Tùy chọn)")
    image_upload = models.ImageField(upload_to='articles/', blank=True, null=True, verbose_name="Tải ảnh lên")

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="articles", verbose_name="Tác giả")
    category = models.ForeignKey(Topic, on_delete=models.SET_NULL, null=True, related_name="articles", verbose_name="Danh mục")
    tags = models.ManyToManyField(Tag, blank=True, related_name="articles", verbose_name="Tags")

    read_time = models.CharField(max_length=20, help_text="e.g. '5 min read'", verbose_name="Thời gian đọc")
    likes = models.PositiveIntegerField(default=0, verbose_name="Lượt thích")

    # Simple view count or fake comment count for UI matching
    views = models.PositiveIntegerField(default=0, verbose_name="Lượt xem")

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Ngày tạo")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Ngày cập nhật")

    class Meta:
        verbose_name = "Bài viết"
        verbose_name_plural = "Bài viết"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
