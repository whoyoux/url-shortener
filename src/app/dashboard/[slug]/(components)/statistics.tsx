import { H2 } from "@/components/ui/H2";
import { H3 } from "@/components/ui/H3";
import { P } from "@/components/ui/P";
import { cn } from "@/lib/utils";
import { CARD_STYLE } from "../page";

type StatisticsProps = {
    totalClicks: number;
    lastLocationCity: string;
    lastLocationCountry: string;
};

const Statistics = ({
    totalClicks,
    lastLocationCity,
    lastLocationCountry,
}: StatisticsProps) => {
    return (
        <div className="flex flex-col gap-4 items-start w-full mt-10">
            <H2>Statistics</H2>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatisticsItem title="Total clicks" value={totalClicks} />
                <StatisticsItem
                    title="Last location city"
                    value={lastLocationCity}
                />
                <StatisticsItem
                    title="Last location country"
                    value={lastLocationCountry}
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

export default Statistics;
