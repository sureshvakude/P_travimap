import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllTrips = async () => {
    try {
        const response = await axios.get(`${apiUrl}/trips`);
        return response;
    } catch (error) {
        console.error("Failed to get trips");
        throw error;
    }
}

export const addTrip = async (data: any) => {
    try {
        const response = await axios.post(`${apiUrl}/trips`, data);
        return response;
    } catch (error) {
        console.error("Failed to add trip", error);
        throw error;
    }
};