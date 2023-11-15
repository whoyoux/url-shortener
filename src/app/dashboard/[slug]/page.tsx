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

const URLDashboard = async ({ params }: { params: { slug: string } }) => {
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

            <Statistics />

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
        <div className="mt-10">
            <H2 className="mt-10">Overview</H2>

            <H4 className="mt-4">Destination: {originalUrl}</H4>
            <div className="flex items-center gap-4">
                <H4>Shorted version:</H4>
                <CopyButton shortUrl={shortUrl} />
            </div>
        </div>
    );
};

const Statistics = () => {
    return (
        <div className="flex flex-col gap-4 items-start w-full mt-10">
            <H2>Statistics</H2>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatisticsItem />
                <StatisticsItem />
                <StatisticsItem />
            </div>
        </div>
    );
};

const StatisticsItem = () => {
    return (
        <div className="border rounded-md py-6 px-4 flex flex-col items-start">
            <H3>1234</H3>
            <P className="[&:not(:first-child)]:mt-0">Total clicks</P>
        </div>
    );
};

const Charts = () => {
    return <P>Some charts or smth</P>;
};

export default URLDashboard;
