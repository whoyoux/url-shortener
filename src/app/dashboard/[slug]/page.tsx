import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AuthGuard from "@/lib/AuthGuard";
import { H1 } from "@/components/ui/H1";

import ChangeNameDialog from "@/components/dashboard/ChangeNameDialog";
import DeleteURLModal from "@/components/dashboard/DeleteURLDialog";

import Overview from "./(components)/overview";
import Statistics from "./(components)/statistics";
import History from "./(components)/history";

export const CARD_STYLE =
    "rounded-md bg-card border text-card-foreground shadow-sm py-6 px-4 w-full";

const URLDashboard = async ({ params }: { params: { slug: string } }) => {
    const session = await AuthGuard();
    const url = await prisma.url.findUnique({
        where: {
            shortUrl: params.slug,
            userId: session?.user?.id,
        },
        include: {
            history: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    if (!url) return notFound();

    return (
        <div className="flex flex-col gap-4 items-start">
            <div className="flex flex-row items-center gap-4 w-full justify-between">
                <div className="flex flex-row gap-4">
                    <H1 className="text-card-foreground">
                        {url.name ? url.name : "Shorted URL"}
                    </H1>
                    <ChangeNameDialog id={url.id} name={url.name} />
                </div>
                <DeleteURLModal id={url.id} />
            </div>

            <Overview originalUrl={url.originalUrl} shortUrl={url.shortUrl} />

            <Statistics
                totalClicks={url.totalClicks}
                lastLocationCity={url.history[0]?.city || "Null"}
                lastLocationCountry={url.history[0]?.country || "Null"}
            />

            <History history={url.history} />
        </div>
    );
};

export default URLDashboard;
