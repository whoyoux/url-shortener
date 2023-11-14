import { Button } from "@/components/ui/button";
import AuthGuard from "@/lib/AuthGuard";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import CreateNewURLForm from "./CreateNewURLForm";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await AuthGuard();

    const urls = await prisma.url.findMany({
        where: {
            userId: session.user.id,
        },
        select: {
            id: true,
            originalUrl: true,
            shortUrl: true,
            name: true,
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    return (
        <main className="flex gap-4 pt-10 md:pt-16">
            <div className="px-4 flex flex-col gap-4 border-r min-w-[200px]">
                <CreateNewURLModal />
                {urls.map((url) => (
                    <SideBarLink key={url.id} {...url} />
                ))}
            </div>
            <div className="flex-1">{children}</div>
        </main>
    );
};

const CreateNewURLModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create new</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Create new URL</DialogTitle>
                <CreateNewURLForm />
            </DialogContent>
        </Dialog>
    );
};

const SideBarLink = ({
    shortUrl,
    name,
}: {
    originalUrl: string;
    shortUrl: string;
    name: string;
}) => {
    return (
        <Link href={`/dashboard/${shortUrl}`}>
            <Button className="w-full" variant="link">
                {name ? `${name}` : `URL ${shortUrl}`}
            </Button>
        </Link>
    );
};

export default DashboardLayout;
