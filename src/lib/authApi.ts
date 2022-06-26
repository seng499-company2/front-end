import axios from "axios";

import { User } from "../hooks/useAuth";

export async function login(params: {
    username: string;
    password: string;
}): Promise<User> {
    const response = await axios.post("http://localhost:8000/api/login/", {
        body: { ...params },
    });

    console.log({ response });

    return response.data;
}

export function logout(): void {
    // delete token
}
