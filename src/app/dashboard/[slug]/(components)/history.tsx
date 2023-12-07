import { H2 } from "@/components/ui/H2";
import { H4 } from "@/components/ui/H4";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { UrlWithHistoryType } from "@/lib/prisma";

import Image from "next/image";

type HistoryProps = {
    history: UrlWithHistoryType["history"];
};

const History = ({ history }: HistoryProps) => {
    return (
        <div className="flex flex-col gap-4 items-start w-full mt-10">
            <H2>History</H2>

            {!!history && history.length > 0 ? (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Country</TableHead>
                                <TableHead>City</TableHead>
                                <TableHead>IP</TableHead>
                                <TableHead className="text-right">
                                    Date
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {history.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        {item.country ? (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Image
                                                            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${item.country}.svg`}
                                                            width={40}
                                                            height={30}
                                                            alt="Country flag"
                                                            className="h-auto"
                                                        />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        Country: {item.country}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
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
                </>
            ) : (
                <H4>No history yet :/</H4>
            )}
        </div>
    );
};

export default History;
