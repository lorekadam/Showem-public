import React from "react";
import Box from "../Restyle/Box";
import Text from "../Restyle/Text";

interface Props {
  number: number;
  active: boolean;
}

export const NumberPill = (props: Props) => {
  const { number, active } = props;
  return (
    <Box
      backgroundColor={"lightPrimary"}
      width={24}
      height={16}
      borderRadius="xxl"
      justifyContent="center"
      alignItems="center"
      opacity={active ? 1 : 0.3}
    >
      <Text fontSize={10}>{number}</Text>
    </Box>
  );
};

export default NumberPill;
