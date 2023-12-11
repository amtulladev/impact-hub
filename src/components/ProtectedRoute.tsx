import { checkLogin } from "@/atom/user";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated] = useAtom(checkLogin);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <>{children}</> : null;
}
