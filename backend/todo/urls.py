from django.urls import path
from .views import todo_list_create, todo_get_delete_update, task_groups, task_group_get_update_delete


urlpatterns = [
    path("api/todo/", todo_list_create),
    path("api/todo/<int:pk>", todo_get_delete_update),
    path("api/groups", task_groups),
    path("api/groups/<int:pk>", task_group_get_update_delete),
]

