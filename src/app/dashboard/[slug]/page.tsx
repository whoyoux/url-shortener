import { prisma } from "@/lib/prisma";
import CopyButton from "../../../components/dashboard/CopyButton";
import { notFound } from "next/navigation";
import AuthGuard from "@/lib/AuthGuard";
import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { H3 } from "@/components/ui/H3";
import ChangeNameDialog from "../../../components/dashboard/ChangeNameDialog";
import { P } from "@/components/ui/P";
import { H4 } from "@/components/ui/H4";
import DeleteURLModal from "../../../components/dashboard/DeleteURLDialog";
import { Url } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const URLDashboard = async ({ params }: { params: { slug: string } }) => {
    noStore();
    const session = await AuthGuard();
    const url = await prisma.url.findUnique({
        where: {
            shortUrl: params.slug,
            userId: session?.user?.id,
        },
    });

    if (!url) return notFound();

    return (
        <div className="flex flex-col gap-4 items-start">
            <div className="flex flex-row items-center gap-4 w-full justify-between">
                <div className="flex flex-row gap-4">
                    <H1>{url.name ? url.name : "Shorted URL"}</H1>
                    <ChangeNameDialog id={url.id} name={url.name} />
                </div>
                <DeleteURLModal id={url.id} />
            </div>

            <Overview originalUrl={url.originalUrl} shortUrl={url.shortUrl} />

            <Statistics url={url} />

            <Charts />
        </div>
    );
};

type OverviewProps = {
    originalUrl: string;
    shortUrl: string;
};

const Overview = ({ originalUrl, shortUrl }: OverviewProps) => {
    return (
        <div className="mt-10 flex flex-col gap-4 w-full">
            <H2>Overview</H2>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-md bg-secondary py-6 px-4 w-full">
                    <H3 className="mb-5">General info</H3>
                    <div className="flex items-center gap-4 mt-2">
                        <H4 className="">Destination: </H4>
                        <div className="truncate">
                            <Link
                                href={originalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                {originalUrl}
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                        <H4>Shorted version:</H4>
                        <CopyButton shortUrl={shortUrl} />
                    </div>
                </div>

                <div className="rounded-md bg-secondary py-6 px-4 w-full">
                    <H3 className="mb-5">Only in PRO plan</H3>
                    <div className="flex items-center gap-4 mt-2">
                        <H4>Slug:</H4>
                        <Button size="sm" variant="destructive" disabled>
                            Only in pro plan
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Statistics = ({ url }: { url: Url }) => {
    return (
        <div className="flex flex-col gap-4 items-start w-full mt-10">
            <H2>Statistics</H2>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatisticsItem title="Total clicks" value={url.totalClicks} />
                <StatisticsItem title="Last clicks" value={2} />
                <StatisticsItem title="Today clicks" value={3214} />
            </div>
        </div>
    );
};

type StatisticsItemProps = {
    title: string;
    value: number;
};

const StatisticsItem = ({ title, value }: StatisticsItemProps) => {
    return (
        <div className="bg-secondary rounded-md py-6 px-4 flex flex-col items-start">
            <H3>{value}</H3>
            <P className="[&:not(:first-child)]:mt-0">{title}</P>
        </div>
    );
};

const Charts = () => {
    return <P>Some charts or smth</P>;
};

export default URLDashboard;
