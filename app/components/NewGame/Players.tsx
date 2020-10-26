import React from "react";
import InputHistory from "./InputHistory";
import OptionsInput from "./OptionsInput";
import OptionsList from "./OptionsList";
import { SingleOption } from "../../types";
import Box from "../Restyle/Box";
import Text from "../Restyle/Text";

interface Props {
  title: string;
  options: SingleOption[];
  addOption(text: SingleOption["text"], history?: boolean): void;
  removeOption(index: number): void;
}

export const Players = (props: Props) => {
  const { title, addOption, removeOption, options } = props;
  const addWithHistory = (text: string) => {
    addOption(text, true);
  };

  return (
    <Box marginBottom="m">
      <InputHistory onPress={addOption} />
      <Text variant="modalHeader" marginBottom="m">
        {title}
      </Text>
      <OptionsInput add={addWithHistory} />
      <OptionsList data={options} remove={removeOption} />
    </Box>
  );
};

export default Players;
