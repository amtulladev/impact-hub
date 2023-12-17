import { checkLoginAtom } from "@/atom/user";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAtomValue(checkLoginAtom);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <>{children}</> : null;
}
