import { userLogin } from "../types/user-login";
import axios, { AxiosResponse, AxiosError } from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

export const registerUser = async (email: string, username: string, password: string): Promise<userLogin> => {
    try {
        const response: AxiosResponse<userLogin> = await apiClient.post(
            `/api/user/register/`,
            {
                email: email,
                username: username,
                password: password,
            }
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            // The request was made and the server responded with a status code
            console.error("API error:", axiosError.response.status, axiosError.response.data);
            throw new Error(`API error: ${axiosError.response.status} - ${axiosError.response.data}`);
        } else if (axiosError.request) {
            // The request was made but no response was received
            console.error("No response received:", axiosError.request);
            throw new Error("No response received from the server");
        } else {
            // Something happened in setting up the request
            console.error("Request setup error:", axiosError.message);
            throw new Error(`Request error: ${axiosError.message}`);
        }
    }
}