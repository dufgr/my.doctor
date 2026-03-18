// Checks session and account requirements before rendering protected content.

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";

const WithAuthentication = async ({
  children,
  mustHavePlan = false,
  mustHaveClinic = false,
}: {
  children: React.ReactNode;
  mustHavePlan?: boolean;
  mustHaveClinic?: boolean;
}) => {
  const session = await getSession(await headers());
  if (!session?.user) {
    redirect("/authentication");
  }
  if (mustHavePlan && !session.user.plan) {
    redirect("/new-subscription");
  }
  if (mustHaveClinic && !session.user.clinic) {
    redirect("/clinic-form");
  }
  return children;
};

export default WithAuthentication;
