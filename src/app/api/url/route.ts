import type { NextRequest } from "next/server";

export type UrlResponseData =
    | {
          status: "success";
          url: string;
          ip: NextRequest["ip"];
          geo: NextRequest["geo"];
      }
    | {
          status: "error";
          message: string;
      };

export const runtime = "edge";

export async function GET(request: NextRequest) {
    try {
        console.log(request.ip);
        console.log(request.geo);
        return Response.json({
            status: "success",
            url: "url",
            ip: request.ip,
            geo: request.geo,
        } satisfies UrlResponseData);
    } catch (err) {
        return Response.json({
            status: "error",
            message: "Not found",
        } satisfies UrlResponseData);
    }
}
