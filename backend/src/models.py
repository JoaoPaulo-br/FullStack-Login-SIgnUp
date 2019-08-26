from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser


class MyUserManager(BaseUserManager):
    def create_user(self,username,email,password=None):
        if not username:
            raise ValueError('Username Required')
        user = self.model(
           username = username,
           email=email,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,username,password):
        user = self.create_user(
          username,
          email = None,
          password=password,
        )
        user.is_admin = True
        user.save(using = self._db)
        return user

class User(AbstractBaseUser):

    username = models.CharField(
       max_length= 100,
       unique = True
    )
    email = models.EmailField(
      max_length=100,
      null = True,
      blank=True
    )
    USERNAME_FIELD = 'username'
    objects = MyUserManager()

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    def get_username(self):
        return self.username

    def get_email(self):
        return self.email

    @property
    def is_staff(self):
        return self.is_admin

    def has_module_perms(self,app_label):
        return True

    def has_perm(self,perm,obj=None):
        return True


