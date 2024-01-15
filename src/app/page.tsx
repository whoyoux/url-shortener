"use client";

import { useFormStatus, useFormState } from "react-dom";

import { P } from "@/components/ui/P";
import { H1 } from "@/components/ui/H1";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createShortUrl } from "@/actions/createShortUrl";
import { useSession } from "next-auth/react";
import { H3 } from "@/components/ui/H3";
import Link from "next/link";

const initialState = {
  message: "",
};

const SubmitButton = () => {
  const { data: session, status } = useSession();
  const { pending } = useFormStatus();
  return (
    <Button
      className="w-full"
      aria-disabled={pending || !session}
      disabled={pending || !session}
    >
      {session
        ? "Shorten!"
        : status === "loading"
        ? "Loading..."
        : "You have to login"}
    </Button>
  );
};

export default function Home() {
  const [state, formAction] = useFormState(createShortUrl, initialState);

  return (
    <main>
      <form
        className="flex flex-col items-center mt-10 md:mt-20 gap-6 max-w-xl mx-auto"
        action={formAction}
      >
        <H1>Shorten your URL</H1>
        <Input
          type="url"
          placeholder="Enter a long URL"
          className="mt-8"
          name="originalUrl"
          required
        />
        <SubmitButton />
        <P>
          You will be redirected after successfully creation of shortened url
        </P>

        {/* <div>
          <H3>
            <Link href={`r/${state?.message}`}>
              {`localhost:300/r/${state?.message}`}
            </Link>
          </H3>
        </div> */}


        <div className="flex flex-col gap-8 w-full mt-10">
        <div className="border rounded-xl bg-card w-full py-10 text-center">
          we already shorted 1200 links!
        </div>
        <div className="border rounded-xl bg-card w-full py-10 text-center">
          lorem ipsum
        </div>
        <div className="border rounded-xl bg-card w-full py-10 text-center">
        lorem ipsum
        </div>
        <div className="border rounded-xl bg-card w-full py-10 text-center">
        lorem ipsum
        </div>
        </div>

      </form>
    </main>
  );
}
