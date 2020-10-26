import React from "react";
import OptionButton from "./OptionButton";
import Text from "../Restyle/Text";
import Grid from "../Restyle/Grid";
import Box from "../Restyle/Box";

interface Props {
  title: string;
  data: number | string;
  set(data: number | string): void;
  options: (number | string)[];
  optionsText?: (number | string)[];
}

export const TitleAndOptions = (props: Props) => {
  const { title, data, set, options, optionsText } = props;
  return (
    <Box marginBottom="m">
      <Text variant="modalHeader" marginBottom="m">
        {title}
      </Text>
      <Grid variant="row" justifyContent="space-between" marginHorizontal="-xs">
        {options.map((option, i) => (
          <Grid flex={1} variant="column" paddingHorizontal="xs" key={option}>
            <OptionButton
              isActive={data === option}
              option={option}
              optionsText={optionsText && optionsText[i]}
              setData={set}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
