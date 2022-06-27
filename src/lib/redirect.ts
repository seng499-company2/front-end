// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from "next/server";

export default function redirect(req: NextRequest, destination: string) {
    const url = req.nextUrl;

    url.pathname = destination;
    return NextResponse.redirect(url);
}
