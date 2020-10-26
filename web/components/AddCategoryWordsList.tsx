import { Box, Button, Flex } from "@chakra-ui/core";
import React from "react";
import { Translated } from "../generated/graphql";

interface AddCategoryWordsListProps {
  words: Translated[];
  setEditWord(index: number): void;
  removeWord(index: number): void;
}

export const AddCategoryWordsList: React.FC<AddCategoryWordsListProps> = ({
  words,
  setEditWord,
  removeWord,
}) => {
  return (
    <>
      <Flex
        padding="10px 0"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="InputBorderColor"
      >
        <Box width="40px">No.</Box>
        <Flex flex={1}>
          <Box width={["50%", "25%"]}>EN</Box>
          <Box width={["50%", "25%"]}>PL</Box>
          <Box width={["50%", "25%"]}>ES</Box>
          <Box width={["50%", "25%"]}>GER</Box>
          <Box width={["50%", "25%"]}>RU</Box>
        </Flex>
        <Flex w="200px"></Flex>
      </Flex>
      {words.map((word, index) => (
        <Flex
          key={index}
          padding="10px 0"
          alignItems="center"
          borderBottom="1px solid"
          borderColor="InputBorderColor"
        >
          <Box width="40px">{index + 1}.</Box>
          <Flex flex={1}>
            <Box width={["50%", "25%"]}>{word.EN}</Box>
            <Box width={["50%", "25%"]}>{word.PL}</Box>
            <Box width={["50%", "25%"]}>{word.ES}</Box>
            <Box width={["50%", "25%"]}>{word.GER}</Box>
            <Box width={["50%", "25%"]}>{word.RU}</Box>
          </Flex>
          <Flex w="200px" justifyContent="space-between">
            <Button
              onClick={() => removeWord(index)}
              colorScheme="red"
              mr="10px"
            >
              REMOVE
            </Button>
            <Button onClick={() => setEditWord(index)}>EDIT</Button>
          </Flex>
        </Flex>
      ))}
    </>
  );
};
