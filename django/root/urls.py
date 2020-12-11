from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/shop/", include("modules.shop.router")),
    path("api/map/", include("modules.map.router")),
]

if bool(settings.DEBUG):
    urlpatterns += staticfiles_urlpatterns() + static(settings.MEDIA_URL,
                                                      document_root=settings.MEDIA_ROOT)
else:
    urlpatterns += staticfiles_urlpatterns()
