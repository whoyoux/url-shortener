import { getServerSession, type NextAuthOptions } from "next-auth";
import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next";

import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { User } from "@prisma/client";
import Stripe from "stripe";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET!,
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        }),
    ],
    events: {
        createUser: async ({ user }) => {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
                apiVersion: "2023-10-16",
            });

            if (!user.email || !user.name)
                throw new Error("User email or name is missing");

            const newCustomerId = await stripe.customers.create({
                email: user.email,
                name: user.name,
            });

            await prisma.user.update({
                where: {
                    email: user.email,
                },
                data: {
                    stripeCustomerId: newCustomerId.id,
                },
            });

            console.log("Created new customer", newCustomerId.id);
        },
    },
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
                session.user.plan = (user as User).plan;
                session.user.stripeSubscriptionId = (
                    user as User
                ).stripeSubscriptionId;
                session.user.stripeCustomerId = (user as User).stripeCustomerId;
            }
            return session;
        },
    },
} satisfies NextAuthOptions;

export function getAuthSession(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, authOptions);
}
