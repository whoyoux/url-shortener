import { H1 } from "@/components/ui/H1";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

const RedirectPage = async ({ params }: { params: { slug: string } }) => {
  const shortUrl = params.slug;

  const data = await prisma.url.findUnique({
    where: {
      shortUrl,
    },
    select: {
      originalUrl: true,
    },
  });

  if (!data) {
    return (
      <main className="pt-10 text-center">
        <H1>No shorted link found!</H1>
      </main>
    );
  }

  redirect(data.originalUrl);
};

export default RedirectPage;