import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { haveTokens } from "../utils";

export const useAuth = () => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const logged = haveTokens();
    if (logged) {
      setIsLogged(true);
    } else {
      router.replace("/admin-panel/login");
    }
  });
  return isLogged;
};

// const { data, loading } = useGetUserQuery();
// useEffect(() => {
//   if (!loading && !data?.getUser) {
//     router.replace("/admin-panel/login");
//   }
// }, [loading, data, router]);
