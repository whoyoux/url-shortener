import { Button } from "@/components/ui/button";
import AuthGuard from "@/lib/AuthGuard";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";

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
    },
  });

  return (
    <main className="flex gap-4 pt-10 md:pt-16">
      <div className="px-4 flex flex-col gap-4 border-r min-w-[200px]">
        {urls.map((url) => (
          <SideBarLink key={url.id} {...url} />
        ))}
      </div>
      <div className="flex-1">{children}</div>
    </main>
  );
};

const SideBarLink = ({
  shortUrl,
}: {
  originalUrl: string;
  shortUrl: string;
}) => {
  return (
    <Link href={`/dashboard/${shortUrl}`}>
      <Button className="w-full dark:text-white">URL {shortUrl}</Button>
    </Link>
  );
};

export default DashboardLayout;
