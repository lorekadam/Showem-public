import React, { useState } from "react";
import Box from "../Restyle/Box";
import Text from "../Restyle/Text";
import NumberPill from "../Shared/NumberPill";
import Grid from "../Restyle/Grid";

interface Props {
  number: number;
  text: string;
  active: boolean;
}

export const TextWithPill = (props: Props) => {
  const { number, text, active } = props;
  return (
    <Grid variant="row" alignItems="center">
      <NumberPill number={number} active={active} />
      <Text marginLeft="10" variant={active ? "textDark" : "textGray"}>
        {text}
      </Text>
    </Grid>
  );
};

export const Word = (props: Props) => {
  const { number, text, active } = props;
  return (
    <Box
      paddingBottom="12"
      marginBottom="12"
      marginTop={number === 1 ? "l" : "0"}
      marginLeft="l"
      marginRight="l"
      borderBottomColor="inputBorder"
      borderBottomWidth={1}
    >
      <TextWithPill number={number} text={text} active={active} />
    </Box>
  );
};

export default Word;
