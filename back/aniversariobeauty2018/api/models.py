from django.db import models
from django.contrib.auth.models import User


class InvitedUsers(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='inviter', null=True, blank=True, on_delete=models.CASCADE)
    invited_user = models.OneToOneField(User, related_name='invitee', null=True, blank=True, on_delete=models.CASCADE)
    
    class Meta:
        ordering = ('created',)


class Tickets(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='tickets', on_delete=models.CASCADE)
    hash = models.UUIDField(null=True, blank=True)
    type = models.CharField(default='register', max_length=30)
    related_user = models.ForeignKey(User, related_name='related_user', null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        ordering = ('created',)

