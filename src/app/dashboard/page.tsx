import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { AuthGuard } from "@/lib/auth-guard";

const Dashboard = async () => {
    const session = await AuthGuard();

    return (
        <main>
            <H1>
                Hello <i>{session.user.name}</i> on dashboard
            </H1>
            <H2 className="mt-4">Please select your URL on the left</H2>
        </main>
    );
};

export default Dashboard;
