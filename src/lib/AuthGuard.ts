import { redirect } from "next/navigation";
import { getAuthSession } from "./auth";

const AuthGuard = async () => {
  const session = await getAuthSession();

  if (!session) redirect("/");

  return session;
};

export default AuthGuard;
