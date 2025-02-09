import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const uploadImage = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append("image", file); // Ensure backend expects "image" as the field name

        const response = await axios.post(`${apiUrl}/image/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data; // Return only the response data
    } catch (error) {
        console.error("Failed to upload image", error);
        throw error;
    }
};

export const deleteImage = async (filePath: string) => {
    try {
        const response = await axios.delete(`${apiUrl}/image/delete`, {
            data: { filePath },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to delete image", error);
        throw error;
    }
};