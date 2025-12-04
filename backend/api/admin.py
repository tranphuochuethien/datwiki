from django.contrib import admin
from .models import Article, Topic, Tag

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'created_at')
    prepopulated_fields = {'slug': ('title',)}
    exclude = ('author', 'views', 'likes')

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.author = request.user
        super().save_model(request, obj, form, change)

from django.db import models
from .widgets import IconPickerWidget

@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    
    def formfield_for_dbfield(self, db_field, **kwargs):
        if db_field.name == 'icon':
            kwargs['widget'] = IconPickerWidget
        return super().formfield_for_dbfield(db_field, **kwargs)

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
