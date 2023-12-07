"use client";

import { Url } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type SideBarLinksProps = {
    urls: Url[];
};

const SideBarLinks = ({ urls }: SideBarLinksProps) => {
    const pathname = usePathname();

    return urls.map((url) => (
        <SideBarLink key={url.id} {...url} path={pathname} />
    ));
};

const SideBarLink = ({
    shortUrl,
    name,
    path,
}: {
    originalUrl: string;
    shortUrl: string;
    name: string;
    path: string;
}) => {
    return (
        <Link href={`/dashboard/${shortUrl}`}>
            <Button
                className={cn(
                    "w-full",
                    path === `/dashboard/${shortUrl}`
                        ? "text-green-400 dark:text-green-600"
                        : ""
                )}
                variant="outline"
            >
                {name ? `${name}` : `URL ${shortUrl}`}
            </Button>
        </Link>
    );
};

export default SideBarLinks;
