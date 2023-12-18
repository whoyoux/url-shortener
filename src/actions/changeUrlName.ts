"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function changeUrlName(prevState: any, formData: FormData) {
    const session = await getAuthSession();
    if (!session) return;

    const schema = z.object({
        id: z.string(),
        name: z
            .string({
                required_error: "Please provide any name.",
                invalid_type_error: "Name must be a string!",
            })
            .min(3, "Name must have 3 or more characters.")
            .max(50, "Name must have 50 or less characters."),
    });

    try {
        const parsedFormData = schema.parse({
            id: formData.get("id"),
            name: formData.get("name"),
        });

        const result = await prisma.url.update({
            where: {
                id: parsedFormData.id,
            },
            data: {
                name: parsedFormData.name,
            },
            select: {
                shortUrl: true,
            },
        });

        revalidatePath(`/dashboard/${result.shortUrl}`);
        return { message: "URL name changed successfully" };
    } catch (err) {
        if (err instanceof z.ZodError) {
            return { message: err.issues[0].message };
        }
        return { message: "Failed to change URL name" };
    }
}
