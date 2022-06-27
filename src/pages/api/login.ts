import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import axios from "axios";

import { USER_TOKEN } from "@lib/constants";

const loginEndpoint = "http://localhost:8000/api/login/";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { username, password } = req.body;

    const response = await axios.post(loginEndpoint, {
        username,
        password,
    });

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
