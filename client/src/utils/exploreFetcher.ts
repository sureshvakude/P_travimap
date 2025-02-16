import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllPlaces = async () => {
    try {
        const response = await axios.get(`${apiUrl}/places`);
        return response.data;
    } catch (error) {
        console.error("Failed to get Places");
        throw error;
    }
}

export const getPlaceById = async (id: string) => {
    try {
        const response = await axios.get(`${apiUrl}/places/${id}`);
        return response;
    } catch (error) {
        console.error("Failed to get place");
        throw error;
    }
}