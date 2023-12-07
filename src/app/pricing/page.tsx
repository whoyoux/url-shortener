"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { subscribe } from "../(actions)/subscription";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const features = [
    {
        title: "Create custom slug",
    },
    {
        title: "Detailed analytics",
    },
    {
        title: "Unlimited shorted links",
    },
    {
        title: "Lorem ipsum",
    },
];

const PricingPage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <div>
            <form
                className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24"
                action={subscribe}
            >
                <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                        Simple, transparent pricing
                    </h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                        Unlock all features including unlimited shorted links.
                    </p>
                </div>
                <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
                    <div className="grid gap-6">
                        <h3 className="text-xl font-bold sm:text-2xl">
                            What&apos;s included in the PRO plan
                        </h3>
                        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                            {features.map((feature) => (
                                <li
                                    className="flex items-center"
                                    key={feature.title}
                                >
                                    <Check className="mr-2 h-4 w-4" />
                                    {feature.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4 text-center">
                        <div>
                            <h4 className="text-7xl font-bold">$19</h4>
                            <p className="text-sm font-medium text-muted-foreground">
                                Billed Monthly
                            </p>
                        </div>
                        {session && session.user.plan === "PRO" ? (
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => router.push("/account")}
                            >
                                Manage my plan
                            </Button>
                        ) : (
                            <Button
                                size="lg"
                                disabled={
                                    !session || session.user.plan === "PRO"
                                }
                                aria-disabled={
                                    !session || session.user.plan === "PRO"
                                }
                            >
                                Get Started
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PricingPage;
