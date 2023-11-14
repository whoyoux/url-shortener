import { prisma } from "@/lib/prisma";
import CopyButton from "./CopyButton";
import { notFound } from "next/navigation";
import AuthGuard from "@/lib/AuthGuard";
import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { H3 } from "@/components/ui/H3";
import ChangeNameForm from "./ChangeNameForm";

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
            <H1>Shorted URL</H1>
            <H3>Destination: {url.originalUrl}</H3>
            <div className="flex items-center gap-4">
                <H3>Shorted version:</H3>
                <CopyButton shortUrl={params.slug} />
            </div>
            <ChangeNameForm id={url.id} name={url.name} />
        </div>
    );
};

export default URLDashboard;
