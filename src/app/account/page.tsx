import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { Button } from "@/components/ui/button";
import AuthGuard from "@/lib/AuthGuard";
import React from "react";
import { cancelSubscription } from "../../actions/subscription";

const AccountPage = async () => {
  const session = await AuthGuard();

  return (
    <div>
      <H1>My account</H1>
      <form className="mt-5" action={cancelSubscription}>
        <H2>My current membership plan: {session.user.plan}</H2>
        {session.user.plan === "PRO" && (
          <Button variant="destructive">Cancel my subscription</Button>
        )}
      </form>
    </div>
  );
};

export default AccountPage;
