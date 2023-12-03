import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UrlResponseData } from "./app/api/url/route";

export async function middleware(request: NextRequest) {
    console.log(request.nextUrl.pathname.split("/")[2]);

    const res = await fetch("http://localhost:3000/api/url", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            shortUrl: request.nextUrl.pathname.split("/")[2],
        }),
    });

    const data = (await res.json()) as UrlResponseData;
    console.log(data);

    if (data.status === "success")
        return NextResponse.redirect(new URL(`${data.url}`, request.url));

    return NextResponse.redirect(new URL("/404", request.url));
}

export const config = {
    matcher: "/r/:path*",
};
