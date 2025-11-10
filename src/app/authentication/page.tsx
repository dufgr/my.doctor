import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isLocalAuthBypassEnabled } from "@/lib/local-auth-config";
import { getSession } from "@/lib/session";

import LoginForm from "./components/login-form";
import SignUpForm from "./components/sign-up-form";

const AuthenticationPage = async () => {
  const session = await getSession(await headers());
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center px-4 py-8">
      <Tabs defaultValue="login" className="w-full max-w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Criar conta</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm
            googleLoginEnabled={Boolean(
              !isLocalAuthBypassEnabled() &&
              process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
            )}
          />
        </TabsContent>
        <TabsContent value="register">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPage;
