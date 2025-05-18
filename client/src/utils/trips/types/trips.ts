export interface TripImage {
  id: number;
  image: string;
}

export interface TripItinerary {
  id: number;
  day: number;
  activities: string;
}

export interface Trip {
  id: number;
  user: number;
  name: string;
  description:string;
  destination: string;
  start_date: string;
  end_date: string;
  budget: string;
  explore_places: string;
  trip_type: 'public' | 'private';
  trip_members: number[];
  created_at: string;
  images: TripImage[];
  itinerary: TripItinerary[];
}

export interface TripApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Trip[];
}