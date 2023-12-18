"use server";

import { getAuthSession } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export async function subscribe() {
    const session = await getAuthSession();
    if (!session) return;

    const customer = session.user.stripeCustomerId;
    if (!customer) return;

    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
        quantity: 1,
        price: process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_PRICE_ID!,
    };

    const origin =
        process.env.NODE_ENV === "production"
            ? "https://whxref.pl"
            : "http://localhost:3000";

    const params: Stripe.Checkout.SessionCreateParams = {
        mode: "subscription",
        customer: customer,
        line_items: [lineItem],
        metadata: {
            userId: session.user.id,
        },
        success_url: `${origin}/account?status=success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/princing?status=cancelled`,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);
    if (!checkoutSession || !checkoutSession.url) return;

    redirect(checkoutSession.url);
}

export async function cancelSubscription() {
    const session = await getAuthSession();
    if (!session) return;

    const subscriptionId = session.user.stripeSubscriptionId;
    if (!subscriptionId) return;

    const subscription = await stripe.subscriptions.cancel(subscriptionId);
    revalidatePath("/dashboard");
    redirect("/");
}
