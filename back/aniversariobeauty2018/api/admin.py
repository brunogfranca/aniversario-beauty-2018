from django.contrib import admin
from django.contrib.auth.models import User
from api.models import Tickets

class TicketsAdmin(admin.ModelAdmin):
    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            # path('my_view/', self.admin_site.admin_view(self.my_view))
        ]
        return my_urls + urls

admin.site.register(Tickets, TicketsAdmin)
