import { H1 } from "@/components/ui/H1";
import AuthGuard from "@/lib/AuthGuard";

const Dashboard = async () => {
  const session = await AuthGuard();

  return (
    <main className="pt-10">
      <H1>
        Hello <i>{session.user.name}</i> on dashboard
      </H1>
    </main>
  );
};

export default Dashboard;
