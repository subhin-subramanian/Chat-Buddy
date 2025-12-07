import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/verifyToken";
import LoginClient from "./LoginClient";

async function LoginPage() {

  const cookieStore = await Promise.resolve(cookies());
  const token = cookieStore.get("jwt")?.value;

  if (token) {
    const authenticated = await verifyToken(token);
    if (authenticated) redirect("/");
  }

  return <LoginClient />;
}

export default LoginPage