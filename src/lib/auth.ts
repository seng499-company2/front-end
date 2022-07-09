// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

import { USER_TOKEN } from "./constants";
import redirect from "./redirect";

interface UserJwtPayload {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    refresh_exp: number;
    id: number;
}

/**
 * Verifies the user's JWT token and returns the payload if
 * it's valid or a response if it's not.
 */
export function verifyAuth(request: NextRequest) {
    // skip if api call
    if (request.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.next();
    }

    const token = request.cookies[USER_TOKEN];

    if (!token && request.nextUrl.pathname !== "/login") {
        // redirect to login page
        return redirect(request, "/login");
    }

    if (!token) {
        return NextResponse.next();
    }

    let decoded;
    try {
        decoded = decodeJwt(token);
    } catch (e) {
        return redirect(request, "/login");
    }

    if (
        decoded.exp < Date.now() / 1000 &&
        request.nextUrl.pathname !== "/login"
    ) {
        // redirect to login page
        return redirect(request, "/login");
    }

    return NextResponse.next();
}

export const getToken = () => {
    if (typeof window === "undefined") {
        return;
    }

    // get token from cookies
    const token = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith(USER_TOKEN));

    if (!token) {
        return;
    }

    const [, tokenValue] = token.split("=");

    return tokenValue;
};
