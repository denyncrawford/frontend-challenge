import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./AuthContext";

interface WithAuthProps {
  excludedRoutes?: string[];
}

const withAuth =
  (WrappedComponent: React.ComponentType, { excludedRoutes = [] }: WithAuthProps) =>
  function AuthComponent () {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      checkAuth();
    }, [router.pathname, user]);

    const checkAuth = () => {
      if (user && excludedRoutes.includes(router.pathname)) {
        router.push("/dashboard");
      }
      if (!user && !excludedRoutes.includes(router.pathname)) {
        router.push("/");
      }
    };

    return <WrappedComponent />;
  };

export default withAuth;