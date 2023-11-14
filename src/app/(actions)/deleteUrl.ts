"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function deleteUrl(prevState: any, formData: FormData) {
    const session = await getAuthSession();
    if (!session) return;

    const schema = z.object({
        id: z.string(),
    });

    try {
        const parsedFormData = schema.parse({
            id: formData.get("id"),
        });

        const deleteUrl = await prisma.url.delete({
            where: {
                id: parsedFormData.id,
                userId: session.user.id,
            },
        });

        revalidatePath(`/dashboard`);
        // return { message: "URL has been removed" };
    } catch (err) {
        if (err instanceof z.ZodError) {
            return { message: err.issues[0].message };
        }
        return { message: "Failed to delete URL" };
    }

    redirect("/dashboard");
}
