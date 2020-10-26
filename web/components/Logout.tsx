import { Box } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { HiLogout } from "react-icons/hi";
import { clearTokens } from "../utils";

interface LogoutProps {}

export const Logout: React.FC<LogoutProps> = ({}) => {
  const router = useRouter();
  const logout = () => {
    clearTokens();
    router.push("/admin-panel/login");
  };
  return (
    <Box
      width="40px"
      height="40px"
      display="flex"
      borderRadius="50%"
      backgroundColor="white"
      onClick={logout}
      color="primary"
      fontWeight={500}
      justifyContent="center"
      alignItems="center"
      fontSize="18px"
      cursor="pointer"
      mr="10px"
    >
      <Box as={HiLogout} size="26px" color="black" />
    </Box>
  );
};
