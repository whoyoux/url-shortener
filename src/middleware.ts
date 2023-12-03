import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client/edge";

const prisma = new PrismaClient();

export async function middleware(request: NextRequest) {
    const shortUrl = request.nextUrl.pathname.split("/")[2];

    const url = await updateStatsAndGetUrl(shortUrl, request);

    if (url) return NextResponse.redirect(new URL(`${url}`, request.url));
    else return NextResponse.redirect(new URL(`/404`, request.url));
}

const updateStatsAndGetUrl = async (shortUrl: string, request: NextRequest) => {
    try {
        const url = await prisma.$transaction(async (tx) => {
            const url = await tx.url.findUnique({
                where: { shortUrl },
                select: { originalUrl: true, id: true },
            });

            if (!url) throw new Error("URL Object not found");

            await tx.url.update({
                where: {
                    shortUrl,
                },
                data: {
                    totalClicks: {
                        increment: 1,
                    },
                    history: {
                        create: {
                            ip: request.ip || "",
                            city: request.geo?.city || "",
                            country: request.geo?.country || "",
                            latitude: request.geo?.latitude || "",
                            longitude: request.geo?.longitude || "",
                            regin: request.geo?.region || "",
                        },
                    },
                },
            });

            return url.originalUrl;
        });

        return url;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const config = {
    matcher: "/r/:path*",
    runtime: "experimental-edge",
};
