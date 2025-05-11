import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${apiUrl}/api/user/login/`, {
            email,
            password
        });
        console.log("Login response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

export const getUser = async (id: string) => {
    try {
        const response = await axios.get(`${apiUrl}/users/${id}`);
        return response.data
    } catch (error) {
        console.error("Failed to get user: ", error);
        throw error;
    }
}