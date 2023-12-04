import { UrlWithHistoryType, prisma } from "@/lib/prisma";
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
import { cn } from "@/lib/utils";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const URLDashboard = async ({ params }: { params: { slug: string } }) => {
    noStore();
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

            <Statistics url={url} />

            <History history={url.history} />

            <Charts />
        </div>
    );
};

type OverviewProps = {
    originalUrl: string;
    shortUrl: string;
};

const CARD_STYLE =
    "rounded-md bg-card border text-card-foreground shadow-sm py-6 px-4 w-full";

const Overview = ({ originalUrl, shortUrl }: OverviewProps) => {
    return (
        <div className="mt-10 flex flex-col gap-4 w-full">
            <H2>Overview</H2>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={cn(CARD_STYLE)}>
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

                <div className={cn(CARD_STYLE)}>
                    <H3 className="mb-5">Only in PRO plan</H3>
                    <div className="flex items-center gap-4 mt-2">
                        <H4 className="text-card-foreground">Slug:</H4>
                        <Button size="sm" variant="destructive" disabled>
                            Only in pro plan
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Statistics = ({ url }: { url: Partial<Url> }) => {
    return (
        <div className="flex flex-col gap-4 items-start w-full mt-10">
            <H2>Statistics</H2>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatisticsItem title="Total clicks" value={url.totalClicks} />
                <StatisticsItem title="Last location city" value={"Krakow"} />
                <StatisticsItem
                    title="Last location country"
                    value={"Poland"}
                />
            </div>
        </div>
    );
};

type StatisticsItemProps = {
    title: string;
    value: number | string | React.ReactNode;
};

const StatisticsItem = ({ title, value }: StatisticsItemProps) => {
    return (
        <div className={cn(CARD_STYLE, "flex flex-col items-start")}>
            <H3>{value}</H3>
            <P className="[&:not(:first-child)]:mt-0">{title}</P>
        </div>
    );
};

type HistoryProps = {
    history: UrlWithHistoryType["history"];
};

const History = ({ history }: HistoryProps) => {
    return (
        <div className="flex flex-col gap-4 items-start w-full mt-10">
            <H2>History</H2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Country</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>IP</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {history.length === 0 && (
                        <TableRow>
                            <H4>
                                <TableCell>No history yet :/</TableCell>
                            </H4>
                        </TableRow>
                    )}
                    {history.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                {item.country ? (
                                    <Image
                                        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${item.country}.svg`}
                                        width={40}
                                        height={30}
                                        alt="Country flag"
                                        className="h-auto"
                                    />
                                ) : (
                                    "No country code found"
                                )}
                            </TableCell>
                            <TableCell>{item.city}</TableCell>
                            <TableCell>{item.ip}</TableCell>
                            <TableCell className="text-right">
                                {`${item.createdAt.toLocaleTimeString()} ${
                                    item.createdAt.toLocaleDateString() ||
                                    "Unknown date"
                                }`}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

const Charts = () => {
    return <P>Some charts or smth</P>;
};

export default URLDashboard;
