import CopyButton from "@/components/dashboard/copy-button";
import { H2 } from "@/components/ui/H2";
import { H3 } from "@/components/ui/H3";
import { H4 } from "@/components/ui/H4";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import { CARD_STYLE } from "@/config/config";

type OverviewProps = {
    originalUrl: string;
    shortUrl: string;
};

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
                            <a
                                href={originalUrl}
                                target="_blank"
                                className="hover:underline"
                            >
                                {originalUrl}
                            </a>
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

export default Overview;
