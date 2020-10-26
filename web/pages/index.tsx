import { Flex, Image } from "@chakra-ui/core";
import { NextPage } from "next";
import React from "react";
import Wrapper from "../components/Wrapper";

interface IndexProps {}

export const Index: NextPage<IndexProps> = ({}) => {
  return (
    <Wrapper>
      <Flex
        minH="calc(100vh - 80px)"
        justifyContent="center"
        alignItems="center"
        py={10}
      >
        <a href="#">
          <Image
            maxW="300px"
            src="./img/google-play-badge.png"
            alt="Google Play"
          />
        </a>
      </Flex>
    </Wrapper>
  );
};

export default Index;
