import { Box, Button, Flex } from "@chakra-ui/core";
import React from "react";
import { Category } from "../generated/graphql";
import NextLink from "next/link";
import { HiCheck } from "react-icons/hi";

interface CategoryRowProps {
  index: number;
  category: Category;
  last: boolean;
}

export const CategoryRow: React.FC<CategoryRowProps> = ({
  category,
  index,
  last,
}) => {
  return (
    <Flex
      padding="1rem"
      fontSize="1.25rem"
      borderBottom={last ? "none" : "1px solid"}
      borderColor="InputBorderColor"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex>
        <Box width="20px">{index}.</Box>
        <Box>
          {category.translate.EN}{" "}
          {category.basic ? (
            <Box as={HiCheck} size="26px" color="green.400" />
          ) : null}
        </Box>
      </Flex>
      <NextLink href={`/admin-panel/category/${category.id}`}>
        <Button width="140px">EDIT</Button>
      </NextLink>
    </Flex>
  );
};
