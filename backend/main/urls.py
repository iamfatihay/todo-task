from django.contrib import admin 
from django.urls import path,include
 
# Three modules for swagger:
from rest_framework import permissions 
from drf_yasg.views import get_schema_view 
from drf_yasg import openapi 
 

schema_view = get_schema_view(
    openapi.Info(
        title="Todo API",
        default_version="v1",
        description="API for managing your todo tasks",
        terms_of_service="#",
        contact=openapi.Contact(email="16fay61@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
) 


urlpatterns = [
    path('admin/', admin.site.urls),

    # Url paths for swagger: 
    path("swagger(<format>\.json|\.yaml)", schema_view.without_ui(cache_timeout=0), name="schema-json"), 
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"), 
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),

    #for debug toolabar
    path('__debug__/', include('debug_toolbar.urls')),

    #my urls
    path('', include('todo.urls')),
]

# Required settings to publish via Pythonanywhere site
# from django.conf import settings
# from django.conf.urls.static import static
# # url -> static-files-path:
# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)