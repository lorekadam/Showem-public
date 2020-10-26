import React from "react";
import { Word as WordType } from "../generated/graphql";
import { Word } from "./Word";

interface WordsListProps {
  words: WordType[];
}

export const WordsList: React.FC<WordsListProps> = ({ words }) => {
  return (
    <>
      {words.map((word) => (
        <Word key={word.id} word={word} />
      ))}
    </>
  );
};
