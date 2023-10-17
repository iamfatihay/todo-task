from .models import ToDoItem, TaskGroup
from .serializers import TodoItemSerializer, TaskGroupSerializer

# ######## MSV (model view set) ###########
from rest_framework.viewsets import ModelViewSet


class TodoItemMVS(ModelViewSet):
    queryset=ToDoItem.objects.all()
    serializer_class=TodoItemSerializer


class TaskGroupMVS(ModelViewSet):
    queryset=TaskGroup.objects.all()
    serializer_class=TaskGroupSerializer