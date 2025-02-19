from import_export import resources, fields
from import_export.widgets import ManyToManyWidget
from django.core.exceptions import ObjectDoesNotExist
from .models import User

class UserResource(resources.ModelResource):
    followers = fields.Field(
        column_name='followers',
        attribute='followers',
        widget=ManyToManyWidget(User, field='id')
    )
    follow = fields.Field(
        column_name='follow',
        attribute='follow',
        widget=ManyToManyWidget(User, field='id')
    )

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'address', 'mobile_number', 'gender', 'dob', 
                  'role', 'is_active', 'is_staff', 'is_superuser', 'followers', 'follow')
        import_id_fields = ('id',)

    def after_import_instance(self, instance, new, row, **kwargs):
        """Handle ManyToMany fields safely, ignoring missing users."""
        if not new:
            instance.followers.clear()
            instance.follow.clear()

        for follower_id in row.get('followers', '').split(','):
            follower_id = follower_id.strip()
            if follower_id:
                try:
                    follower = User.objects.get(id=follower_id)
                    instance.followers.add(follower)
                except ObjectDoesNotExist:
                    pass  # Skip if the user doesn't exist

        for follow_id in row.get('follow', '').split(','):
            follow_id = follow_id.strip()
            if follow_id:
                try:
                    follow = User.objects.get(id=follow_id)
                    instance.follow.add(follow)
                except ObjectDoesNotExist:
                    pass