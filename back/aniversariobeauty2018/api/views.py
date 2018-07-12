from uuid import uuid4
from django.contrib.auth.models import User
from api.serializers import UserSerializer
from api.models import Tickets, InvitedUsers
from rest_framework import mixins
from rest_framework import generics


class UserList(mixins.CreateModelMixin,
                generics.GenericAPIView):
    """
    Create a new user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def perform_create(self, serializer):
        ref = serializer.initial_data.get('ref')
        user = serializer.save()
        ticket = Tickets(user=user, hash=uuid4())
        ticket.save()
        if ref:
            parent = User.objects.get(id=int(ref))
            rel = InvitedUsers(user=parent, invited_user=user)
            rel.save()
            parent_ticket = Tickets(user=parent, hash=uuid4(), related_user=user, type='invite')
            parent_ticket.save()


class UserDetail(mixins.RetrieveModelMixin,
                generics.GenericAPIView):
    """
    Retrieve, update or delete a user instance.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
