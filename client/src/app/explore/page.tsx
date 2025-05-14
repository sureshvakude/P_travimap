'use client';

import { useState, useEffect, useCallback } from 'react';
import { Place, PlacesApiResponse } from '@/utils/explore/type/place';
import { getAllPlaces } from '@/utils/explore/api/get-all-places';
import PlaceCard from './PlaceCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import PlaceDetailsModal from './PlaceDeatilModal';

const ExplorePage = () => {
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

    const fetchPlaces = useCallback(async () => {
        try {
            setLoading(true);
            const response: PlacesApiResponse = await getAllPlaces(page, 20);

            setPlaces(prev => [...prev, ...response.results]);
            setHasMore(response.next !== null);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch places');
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchPlaces();
    }, [fetchPlaces]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredPlaces(places);
        } else {
            const filtered = places.filter(place =>
                place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                place.nearby_city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                place.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPlaces(filtered);
        }
    }, [searchQuery, places]);

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight ||
            loading ||
            !hasMore
        ) {
            return;
        }
        setPage(prev => prev + 1);
    }, [loading, hasMore]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Explore Places</h1>

                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {filteredPlaces.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredPlaces.map((place, index) => (
                            <div
                                key={`${place.id}-${place.name}-${index}`}
                                onClick={() => setSelectedPlace(place)}
                                className="cursor-pointer"
                            >
                                <PlaceCard place={place} />
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                {searchQuery ? 'No matching places found' : 'No places available'}
                            </p>
                        </div>
                    )
                )}

                {loading && (
                    <div className="flex justify-center my-8">
                        <LoadingSpinner />
                    </div>
                )}

                {!hasMore && !loading && filteredPlaces.length > 0 && (
                    <div className="text-center py-6 text-gray-500">
                        You've reached the end of results
                    </div>
                )}

                {selectedPlace && (
                    <PlaceDetailsModal
                        place={selectedPlace}
                        onClose={() => setSelectedPlace(null)}
                    />
                )}
            </div>
        </>
    );
};

export default ExplorePage;