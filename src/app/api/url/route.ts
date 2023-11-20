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

export const runtime = "edge";

export async function GET(request: NextRequest) {
    try {
        console.log(request.ip);
        return Response.json({
            status: "success",
            url: "url",
        } satisfies UrlResponseData);
    } catch (err) {
        return Response.json({
            status: "error",
            message: "Not found",
        } satisfies UrlResponseData);
    }
}
