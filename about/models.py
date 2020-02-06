from django.db import models

class Suggestion(models.Model):
    content = models.TextField(max_length=100000)

    def __str__(self):
        return self.content[:50]