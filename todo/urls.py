from django.urls import path, include
from .views import TodoItemMVS, TaskGroupMVS
from rest_framework import routers

router=routers.DefaultRouter()
router.register("/api/todo/", TodoItemMVS)
router.register("/api/todo-group", TaskGroupMVS)


urlpatterns = [
    path("", include(router.urls))
]

