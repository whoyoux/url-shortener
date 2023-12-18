"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdefABCDEF", 6);

export async function createShortUrl(prevState: any, formData: FormData) {
  const schema = z.object({
    originalUrl: z.string().url().min(5).max(200),
  });

  //its some bug with redirect in try catch, have to go around

  let shortUrlId = "";

  try {
    const session = await getAuthSession();
    if (!session) return { message: "You must be logged in to do that" };

    const parsedFormData = schema.parse({
      originalUrl: formData.get("originalUrl"),
    });

    const existingUrls = await prisma.url.findMany({
      select: {
        shortUrl: true,
        slug: true,
      },
    });

    let id = await nanoid();

    const existingLinksWithSlugs = [] as string[];

    for (const url of existingUrls) {
      if (existingLinksWithSlugs.includes(url.shortUrl))
        existingLinksWithSlugs.push(url.shortUrl);
      if (url.slug && existingLinksWithSlugs.includes(url.slug))
        existingLinksWithSlugs.push(url.slug);
    }

    if (existingLinksWithSlugs.includes(id)) id = nanoid();

    //Only 1 checking if id is equals to already existing id and slug

    const result = await prisma.url.create({
      data: {
        originalUrl: parsedFormData.originalUrl,
        shortUrl: id,
        userId: session.user.id,
      },
    });

    shortUrlId = result.shortUrl;
  } catch (e) {
    console.error(e);
    return { message: "Failed to create URL" };
  }
  redirect(`/dashboard/${shortUrlId}`);
}
