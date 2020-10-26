import React from "react";
import Box from "../Restyle/Box";
import Text from "../Restyle/Text";
import { Theme } from "../../styled/theme";

interface Props {
  color: keyof Theme["colors"];
  team: string;
  user: string;
}

export const UserTurn = (props: Props) => {
  return (
    <>
      <Text color={props.color}>{props.team}</Text>
      <Text>{props.user}</Text>
    </>
  );
};

export default UserTurn;
