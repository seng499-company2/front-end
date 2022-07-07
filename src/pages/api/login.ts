import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import axios from "axios";

import { API_URL, USER_TOKEN } from "@lib/constants";

const loginEndpoint = `${API_URL}/login/`;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { username, password } = req.body;

    let response;
    try {
        response = await axios.post(loginEndpoint, {
            username,
            password,
        });
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
        return;
    }
    const data = await response.data;

    // check for details because 200 is always returned
    // details are included in the response if the login failed
    if (data.username || data.password || data.detail) {
        return res.status(401).json(data);
    }

    // set USER_TOKEN cookie
    res.setHeader(
        "Set-Cookie",
        serialize(USER_TOKEN, data.token, {
            path: "/",
            sameSite: "lax",
        })
    );

    res.status(200).json(data);
}
