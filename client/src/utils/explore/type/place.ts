// types/place.ts
export interface Place {
  id: number;
  name: string;
  description: string;
  nearby_city: string;
  images: PlaceImage[];
  likes: number;
  category: string;
  region: string;
  best_time_to_visit: string;
  state: string;
  distance_from_nearby_city: string;
  rating: number;
}

export interface PlacesApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Place[];
}

export interface PlaceImage{
  id: number;
  image: string;
}