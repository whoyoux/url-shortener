import { Button } from "@/components/ui/button";
import { AuthGuard } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CreateNewURLForm from "./(components)/create-new-url-form";
import SideBarLinks from "./(components)/sidebar-links";
import LinksComboBox from "./(components)/links-combo-box";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await AuthGuard();

    const urls = await prisma.url.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    return (
        <main className="flex flex-col md:flex-row gap-4">
            <div className="hidden px-4 md:flex flex-col gap-4 border-r min-w-[200px]">
                <CreateNewURLModal />
                <SideBarLinks urls={urls} />
            </div>
            <div className="flex md:hidden w-full justify-between gap-4">
                <LinksComboBox urls={urls} />
                <CreateNewURLModal />
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

export default DashboardLayout;
