import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllPosts = async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/post/posts`);
        return response.data;
    } catch (error) {
        console.error("Failed to get Places");
        throw error;
    }
}

export const getUserPosts = async (id:string) => {
    try{
        const response = await axios.get(`${apiUrl}/posts/user/posts/${id}`);
        return response;
    } catch(error){
        console.error("Failed to get posts");
        throw error;
    }
}

export const getPostById = async (id: string) => {
    try{
        const response = await axios.get(`${apiUrl}/posts/${id}`);
        return response.data;
    } catch(error){
        console.error("Failed to get post");
        throw error;
    }
}