import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@lib/auth";

export function middleware(req: NextRequest) {
    return verifyAuth(req);
}
