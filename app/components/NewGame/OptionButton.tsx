import React from "react";
import Button from "../Restyle/Button";
import Text from "../Restyle/Text";

interface Props {
  isActive: boolean;
  option: string | number;
  setData(option: string | number): void;
  optionsText?: string | number;
}

const OptionButton = (props: Props) => {
  const { isActive, option, setData, optionsText } = props;
  const set = () => {
    setData(option);
  };
  return (
    <Button
      onPress={set}
      variant={isActive ? "optionActive" : "option"}
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Text color={isActive ? "white" : "inactivePrimary"}>
        {optionsText || option}
      </Text>
    </Button>
  );
};

export default OptionButton;
