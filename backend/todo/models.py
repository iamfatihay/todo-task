from django.db import models

class ToDoItem(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    due_date = models.CharField(max_length=50) # With CharField, date and time information is stored as text.
    is_completed = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    group = models.ForeignKey('TaskGroup', on_delete=models.SET_NULL, blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class TaskGroup(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
