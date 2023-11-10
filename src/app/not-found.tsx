import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="mt-10 w-full flex flex-col gap-2 items-center justify-center">
      <H1>404</H1>
      <H2>Page not found</H2>
      <Button size="lg" variant="outline">
        <Link href="/">Go back to /</Link>
      </Button>
    </main>
  );
};

export default NotFound;
