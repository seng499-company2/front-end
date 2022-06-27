import { USER_TOKEN } from "@lib/constants";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // delete USER_TOKEN cookie
    res.setHeader(
        "Set-Cookie",
        serialize(USER_TOKEN, "", {
            path: "/",
            maxAge: -1,
        })
    );
    res.status(200).json({ message: "Logged out" });
}
