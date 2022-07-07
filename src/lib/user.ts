import axios from "axios";

import { getToken } from "./auth";
import { decodeJwt, JWTPayload } from "jose";

type UserPayload = JWTPayload & {
    email: string;
    exp: number;
    first_name: string;
    iat: number;
    is_superuser: boolean;
    jti: string;
    last_name: string;
    refresh_exp: number;
    token_type: string;
    user_id: number;
    username: string;
};

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    isAdmin: boolean;
}

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

export function getUserClaims(): User {
    const token = getToken();

    if (!token) {
        return undefined;
    }

    // @ts-ignore
    const decoded: UserPayload = decodeJwt(token);

    return {
        id: decoded.user_id,
        firstName: decoded.first_name,
        lastName: decoded.last_name,
        email: decoded.email,
        username: decoded.username,
        isAdmin: decoded.is_superuser,
    };
}
