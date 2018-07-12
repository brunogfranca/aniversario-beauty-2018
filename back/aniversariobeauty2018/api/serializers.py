from collections import OrderedDict
from django.contrib.auth.models import User
from api.models import Tickets
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('id', 'name', 'first_name', 'last_name', 'username', 'email', 'tickets')
        read_only_fields = ('tickets',)
        extra_kwargs = {
            'ref': {
                'read_only': True
            }
        }

    def get_name(self, instance):
        if not isinstance(type(instance), OrderedDict):
            return '{} {}'.format(instance.first_name, instance.last_name)

    def _format_tickets(self, ticket):
        data = {
            'hash': ticket.hash,
            'type': ticket.type
        }
        if ticket.related_user:
            data['related_user'] = {
                'username': ticket.related_user.username,
                'name': self.get_name(ticket.related_user),
                'email': ticket.related_user.email
            }
        return data

    def to_representation(self, instance):
        """Convert `username` to lowercase."""
        ret = super().to_representation(instance)
        ret['tickets'] = list(map(self._format_tickets, instance.tickets.all()))
        return ret