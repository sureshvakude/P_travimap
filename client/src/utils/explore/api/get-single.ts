import { PlacesApiResponse, Place } from '../type/place';
import axios, { AxiosResponse, AxiosError } from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

export const getSingle = async (place_id: string): Promise<Place> => {
    try {
        const response: AxiosResponse<Place> = await apiClient.get(
            `/api/place/places/${place_id}/`
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            // The request was made and the server responded with a status code
            // console.error('API error:', axiosError.response.status, axiosError.response.data);
            throw new Error(`API error: ${axiosError.response.status} - ${axiosError.response.data}`);
        } else if (axiosError.request) {
            // The request was made but no response was received
            // console.error('No response received:', axiosError.request);
            throw new Error('Sorry for the inconvenience, please try again later.');
        } else {
            // Something happened in setting up the request
            // console.error('Request setup error:', axiosError.message);
            throw new Error(`Request error: ${axiosError.message}`);
        }
    }
}