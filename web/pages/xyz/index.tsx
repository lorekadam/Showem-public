import { Box, Container, Flex, Heading, Icon } from "@chakra-ui/core";
import { NextPage } from "next";
import React from "react";
import Wrapper from "../../components/Wrapper";
import { useAuth } from "../../hooks/useAuth";
import NextLink from "next/link";
import { HiOutlinePlusCircle, HiOutlineViewList } from "react-icons/hi";

interface IndexProps {}

const dashboard = [
  {
    name: "Categories",
    link: "/admin-panel/categories",
    icon: HiOutlineViewList,
  },
  {
    name: "Add category",
    link: "/admin-panel/add-category",
    icon: HiOutlinePlusCircle,
  },
];

export const Index: NextPage<IndexProps> = ({}) => {
  const isLogged = useAuth();
  return (
    <Wrapper navbar={{ isLogged }}>
      <Container maxW="xl">
        <Flex
          minH="calc(100vh - 80px)"
          justifyContent="center"
          alignItems="center"
          flexDirection={["column", "row"]}
        >
          {dashboard.map(({ name, link, icon }) => (
            <NextLink href={link} key={name}>
              <Box
                backgroundColor="white"
                borderRadius="lg"
                padding="2rem"
                maxW="500px"
                w="90%"
                boxShadow="0 0 20px 0px rgba(60,87,198,0.12)"
                flex={1}
                cursor="pointer"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                margin="20px"
              >
                <Icon
                  as={icon}
                  boxSize="80px"
                  color="primary.400"
                  marginBottom="20px"
                />
                <Heading as="h4" size="md" fontWeight="400">
                  {name}
                </Heading>
              </Box>
            </NextLink>
          ))}
        </Flex>
      </Container>
    </Wrapper>
  );
};

export default Index;
