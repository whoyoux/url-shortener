import { prisma } from "@/lib/prisma";
import CopyButton from "./CopyButton";
import { notFound } from "next/navigation";
import AuthGuard from "@/lib/AuthGuard";
import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { H3 } from "@/components/ui/H3";
import ChangeNameForm from "./ChangeNameForm";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

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
            <div className="flex flex-row items-center gap-4">
                <H1>{url.name ? url.name : "Shorted URL"}</H1>
                <ChangeNameDialog id={url.id} name={url.name} />
            </div>

            <H3>Destination: {url.originalUrl}</H3>
            <div className="flex items-center gap-4">
                <H3>Shorted version:</H3>
                <CopyButton shortUrl={params.slug} />
            </div>
        </div>
    );
};

type ChangeNameDialogProps = {
    id: string;
    name: string;
};

const ChangeNameDialog = ({ id, name }: ChangeNameDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <Pen />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <ChangeNameForm id={id} name={name} />
            </DialogContent>
        </Dialog>
    );
};

export default URLDashboard;
