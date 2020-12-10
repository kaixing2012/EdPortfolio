"""root URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path("", views.home, name="home")
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path("", Home.as_view(), name="home")
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path("blog/", include("blog.urls"))
"""

from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import path, include


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/wonder/", include("modules.map.app_wonder.urls")),
    path("api/product-item/", include("modules.shop.app_product_item.urls")),
    path("api/category/", include("modules.shop.app_category.urls")),
    path("api/gender/", include("modules.shop.app_gender.urls")),
    path("api/color/", include("modules.shop.app_color.urls")),
    path("api/size/", include("modules.shop.app_size.urls")),
]

urlpatterns += staticfiles_urlpatterns()
