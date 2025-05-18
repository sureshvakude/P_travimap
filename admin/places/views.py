from rest_framework import generics, status
from django.db.models import Q
from .models import Place
from .serializers import PlaceSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 50

class PlaceListView(generics.ListAPIView):
    serializer_class = PlaceSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Place.objects.all()

        # Get query params
        category = self.request.query_params.get('category')
        name = self.request.query_params.get('name')
        state = self.request.query_params.get('state')
        description = self.request.query_params.get('description')

        # Filter with OR condition
        if category or name or state or description:
            query = Q()
            if category:
                query |= Q(category__icontains=category)
            if name:
                query |= Q(name__icontains=name)
            if state:
                query |= Q(state__icontains=state)
            if description:
                query |= Q(description__icontains=description)
            queryset = queryset.filter(query)

        return queryset

class PlaceDetailView(generics.RetrieveAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer

class PlaceUpdateView(generics.UpdateAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    http_method_names = ['patch']  # Only allow PATCH method

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)