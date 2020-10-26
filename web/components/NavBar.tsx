import React from "react";
import NextLink from "next/link";
import { Flex, Heading, Box, Container } from "@chakra-ui/core";
import ChangeLanguage from "./ChangeLanguage";
import { Logout } from "./Logout";

export interface NavBarProps {
  isLogged?: boolean;
}

export const NavBar: React.FC<NavBarProps> = ({ isLogged }) => {
  return (
    <Box position="absolute" h={20} w="100%" top="0" left="0" right="0">
      <Container maxW="xl" paddingY={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <NextLink href="/">
            <Heading fontFamily="poppins" color="logo" cursor="pointer">
              Showem
            </Heading>
          </NextLink>
          <Flex>{isLogged && <Logout />}</Flex>
        </Flex>
      </Container>
    </Box>
  );
};

/* <ChangeLanguage /> */
