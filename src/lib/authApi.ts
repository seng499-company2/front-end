import axios from "axios";

import { User } from "../hooks/useAuth";

export async function login(params: {
    username: string;
    password: string;
}): Promise<User> {
    const { username, password } = params;
    const response = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
    });

    return response.data;
}

export function logout(): void {
    // delete token
}
