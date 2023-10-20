from rest_framework import serializers
from .models import ToDoItem, TaskGroup


class TodoItemSerializer(serializers.ModelSerializer):
    due_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    group_name = serializers.StringRelatedField(source="group")  # We added a new field "group_name"
    
    class Meta:
        model=ToDoItem
        fields=("__all__")


class TaskGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model=TaskGroup
        fields=("__all__")