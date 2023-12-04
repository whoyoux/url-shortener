import { PrismaClient, Prisma } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const UrlWithHistory = Prisma.validator<Prisma.UrlDefaultArgs>()({
    include: {
        history: true,
    },
});

export type UrlWithHistoryType = Prisma.UrlGetPayload<typeof UrlWithHistory>;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
