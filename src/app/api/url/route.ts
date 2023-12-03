import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export type UrlResponseData =
    | {
          status: "success";
          url: string;
      }
    | {
          status: "error";
          message: string;
      };

export async function POST(request: NextRequest) {
    const { shortUrl } = await request.json();

    // should be wrapped in transaction

    try {
        if (!shortUrl)
            return Response.json({
                status: "error",
                message: "No shortUrl provided",
            } satisfies UrlResponseData);

        const url = await prisma.url.findUnique({
            where: {
                shortUrl,
            },
            select: {
                originalUrl: true,
                id: true,
            },
        });

        if (!url) {
            return Response.json({
                status: "error",
                message: "URL Object not found",
            } satisfies UrlResponseData);
        }

        await prisma.url.update({
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

        return Response.json({
            status: "success",
            url: url.originalUrl,
        } satisfies UrlResponseData);
    } catch (err) {
        console.log(err);
        return Response.json({
            status: "error",
            message: "Internal server error. Please try again later.",
        } satisfies UrlResponseData);
    }
}
