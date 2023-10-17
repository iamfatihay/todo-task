from .models import ToDoItem, TaskGroup
from .serializers import TodoItemSerializer, TaskGroupSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.status import *


@api_view(["GET", "POST"])
def todo_list_create(request):
    if request.method == "GET":
        todos = ToDoItem.objects.all()
        serializer = TodoItemSerializer(todos, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = TodoItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def todo_get_delete_update(request, pk):
    todo = get_object_or_404(ToDoItem, id=pk)

    if request.method == "GET":       
        serializer = TodoItemSerializer(todo)
        return Response(serializer.data)
    
    elif request.method == "PUT":
        serializer = TodoItemSerializer(data=request.data, instance=todo)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
    elif request.method == "DELETE":
        # Soft delete
        todo.is_deleted = True
        todo.save()
        message = {"message": "Successfully soft deleted!"}
        return Response(message, status=HTTP_204_NO_CONTENT)
    
    # elif request.method == "DELETE":
    #     todo.delete()
    #     message={"message":"Successfully deleted!"}
    #     return Response(message, status=HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def soft_deleted_items(request):
    soft_deleted_items = ToDoItem.objects.filter(is_deleted=True)
    serializer = TodoItemSerializer(soft_deleted_items, many=True)
    return Response(serializer.data, status=HTTP_200_OK)


@api_view(['GET', 'POST'])
def task_groups(request):
    if request.method == 'GET':
        task_groups = TaskGroup.objects.all()
        serializer = TaskGroupSerializer(task_groups, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
    
    elif request.method == 'POST':
        serializer = TaskGroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

