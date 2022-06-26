import axios from "axios";
import { User } from "../hooks/useAuth";

export async function getCurrentUser(): Promise<User> {
    const response = await axios.get("http://localhost:8000/api/user/");

    return response.data;
}
