import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AuthGuard from "@/lib/authGuard";
import { H1 } from "@/components/ui/H1";

import ChangeNameDialog from "@/components/dashboard/change-name-dialog";
import DeleteURLModal from "@/components/dashboard/detele-url-dialog";

import Overview from "./(components)/overview";
import Statistics from "./(components)/statistics";
import History from "./(components)/history";

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
