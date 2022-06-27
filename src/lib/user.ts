import axios from "axios";

import { User } from "@hooks/useAuth";
import { getToken } from "./auth";

export async function getCurrentUser(): Promise<User> {
    const token = getToken();

    let response;
    try {
        response = await axios.get("http://localhost:8000/api/user/", {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        return undefined;
    }

    return response.data;
}
