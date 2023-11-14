"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdefABCDEF", 6);

export async function createShortUrl(prevState: any, formData: FormData) {
  const schema = z.object({
    originalUrl: z.string().url().min(5).max(1000),
  });

  try {
    const session = await getAuthSession();

    if (!session) return;

    const parsedFormData = schema.parse({
      originalUrl: formData.get("originalUrl"),
    });

    // TODO: all the magic
    const result = await prisma.url.create({
      data: {
        originalUrl: parsedFormData.originalUrl,
        shortUrl: nanoid(),
        userId: session.user.id,
      },
    });

    console.log(parsedFormData);
    console.log(result);

    revalidatePath("/");
    return { message: result.shortUrl };
  } catch (e) {
    console.error(e);
    return { message: "Failed to create URL" };
  }
}
