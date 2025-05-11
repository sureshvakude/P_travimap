import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllPlaces = async (limit = 20, offset = 0) => {
    try {
        const response = await axios.get(`${apiUrl}/api/place/places/all/`, {
            params: { limit, offset }
        });
        return response.data; // Includes: count, next, previous, results
    } catch (error) {
        console.error("Failed to get Places", error);
        throw error;
    }
}

export const getPlaceById = async (id: string) => {
    try {
        const response = await axios.get(`${apiUrl}/api/place/places/${id}`);
        return response.data;
    } catch (error) {
        console.error("Failed to get place", error);
        throw error;
    }
}