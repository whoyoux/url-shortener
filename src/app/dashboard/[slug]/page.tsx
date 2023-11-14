import { prisma } from "@/lib/prisma";
import CopyButton from "./CopyButton";
import { notFound } from "next/navigation";
import AuthGuard from "@/lib/AuthGuard";

const URLDashboard = async ({ params }: { params: { slug: string } }) => {
  const session = await AuthGuard();
  const data = await prisma.url.findUnique({
    where: {
      shortUrl: params.slug,
      userId: session?.user?.id,
    },
  });

  if (!data) return notFound();

  return (
    <div>
      <CopyButton shortUrl={params.slug} />
    </div>
  );
};

export default URLDashboard;
