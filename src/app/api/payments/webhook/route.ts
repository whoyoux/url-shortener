import { NextRequest, NextResponse } from "next/server";
import type { Stripe } from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export enum StripeWebhooks {
    AsyncPaymentSuccess = "checkout.session.async_payment_succeeded",
    Completed = "checkout.session.completed",
    PaymentFailed = "checkout.session.async_payment_failed",
    SubscriptionCreated = "customer.subscription.created",
    SubscriptionDeleted = "customer.subscription.deleted",
    SubscriptionUpdated = "customer.subscription.updated",
}

export async function POST(req: NextRequest) {
    try {
        const buf = await req.text();
        const sig = req.headers.get("stripe-signature")!;

        const event = stripe.webhooks.constructEvent(
            buf,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        const subscription = event.data.object as Stripe.Subscription;
        const subscriptionId = subscription.id;

        switch (event.type) {
            case StripeWebhooks.SubscriptionCreated:
                await prisma.user.update({
                    where: {
                        stripeCustomerId: subscription.customer as string,
                    },
                    data: {
                        stripeSubscriptionId: subscriptionId,
                        plan: "PRO",
                    },
                });
                break;
            case StripeWebhooks.SubscriptionDeleted:
                await prisma.user.update({
                    where: {
                        stripeCustomerId: subscription.customer as string,
                    },
                    data: {
                        stripeSubscriptionId: null,
                        plan: "FREE",
                    },
                });
                break;
            default:
                // console.warn(`Unhandled event type ${event.type}`);
                break;
        }

        return NextResponse.json({
            received: true,
        });
    } catch (err) {
        const errorMessage =
            err instanceof Error ? err.message : "Unknown error";

        if (err! instanceof Error) console.log(err);

        console.log(`Error message: ${errorMessage}`);

        return NextResponse.json(
            {
                error: {
                    message: `Webhook error ${errorMessage}`,
                },
            },
            {
                status: 400,
            }
        );
    }

    // try {
    //     const signature = headers().get(STRIPE_SIGNATURE_HEADER) as string;

    //     if (!signature) {
    //         throw new Error("Stripe signature is missing");
    //     }

    //     const body = await req.text();

    //     const event = await stripe.webhooks.constructEventAsync(
    //         body,
    //         signature,
    //         process.env.STRIPE_WEBHOOK_SECRET || ""
    //     );

    //     switch (event.type) {
    //         case StripeWebhooks.Completed:
    //             const session = event.data.object as Stripe.Checkout.Session;
    //             const subscriptionId = session.subscription as string;

    //             console.log(subscriptionId);
    //             break;
    //     }

    //     return new Response("OK", { status: 200 });
    // } catch (err) {
    //     console.error("Error in webhook route", err);
    //     return new Response("Error", { status: 500 });
    // }
}
