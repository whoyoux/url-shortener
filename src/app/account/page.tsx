import AuthGuard from "@/lib/AuthGuard";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cancelSubscription } from "../../actions/subscription";
import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { H4 } from "@/components/ui/H4";

const AccountPage = async () => {
    const session = await AuthGuard();

    return (
        <div className="w-full">
            <H1>My account</H1>
            <div className="mt-10 flex flex-col justify-center items-center">
                <Image
                    src={session.user.image ?? ""}
                    alt="Profile picture"
                    width={200}
                    height={200}
                    className="rounded-full h-auto w-[100px]"
                />
                <H2 className="mt-5">Welcome, {session.user.name}</H2>
                <form className="mt-5" action={cancelSubscription}>
                    <div className="w-full flex justify-between">
                        <H4>My current membership plan: </H4>
                        {session.user.plan === "PRO" ? (
                            <span className="font-bold text-primary">PRO</span>
                        ) : (
                            <span>FREE</span>
                        )}
                    </div>
                    {session.user.plan === "PRO" && (
                        <>
                            <Button
                                variant="destructive"
                                className="w-full mt-5"
                            >
                                Cancel my subscription
                            </Button>
                            <span className="text-sm text-red-500">
                                If you cancel subscription, it will cancel
                                immediately!
                            </span>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AccountPage;
