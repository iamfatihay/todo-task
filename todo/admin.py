from django.contrib import admin
from .models import TaskGroup, ToDoItem

admin.site.register(TaskGroup)
admin.site.register(ToDoItem)
