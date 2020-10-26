import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { SingleOption } from "../../types";

interface State {
  groups: SingleOption[][];
}

interface Props {
  buttonText?: string;
  options: SingleOption[];
  groupsAmount: number;
  setGroups: (groups: SingleOption[][]) => void;
}

export default function RollGroups(props: Props) {
  const { buttonText, options, groupsAmount, setGroups } = props;
  const makeGroups = () => {
    const groups: State["groups"] = [];
    const source = [...options];
    let group = 0;
    for (let i = 0; i < options.length; i++) {
      const optionIndex = Math.floor(Math.random() * source.length);
      if (groups[group] === undefined) {
        groups[group] = [];
      }
      groups[group].push(source[optionIndex]);
      group++;
      source.splice(optionIndex, 1);
      if (group === groupsAmount) {
        group = 0;
      }
    }
    setGroups(groups);
  };
  return (
    <View>
      <Button
        icon="shuffle"
        mode="contained"
        onPress={makeGroups}
        disabled={options.length < groupsAmount}
      >
        {buttonText ? buttonText : "Losuj"}
      </Button>
    </View>
  );
}
