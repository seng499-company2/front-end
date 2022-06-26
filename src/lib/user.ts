import axios from "axios";
import { User } from "../hooks/useAuth";

// request interceptor to add token to request headers
axios.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers = {
                authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export async function getCurrentUser(): Promise<User> {
    const response = await axios.get("http://localhost:8000/api/user/", {});

    return response.data;
}
