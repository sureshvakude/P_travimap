import { Trip } from "@/utils/trips/types/trips";
import axios, { AxiosResponse, AxiosError } from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

export const joinTrip = async (tripId: string): Promise<Trip | null> => {
    try {
        const response: AxiosResponse<Trip> = await apiClient.get(`/api/trip/joined/${tripId}/`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error joining trip:", error.response?.data);
        } else {
            console.error("Unexpected error:", error);
        }
        return null;
    }
}