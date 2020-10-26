import React from "react";

import { SingleOption } from "../../types";
import Box from "../Restyle/Box";
import Button from "../Restyle/Button";
import Grid from "../Restyle/Grid";
import Icon from "../Restyle/Icon";
import Text from "../Restyle/Text";

interface Props {
  item: SingleOption;
  index: number;
  remove?: (key: Props["index"]) => void;
}

export const Option = (props: Props) => {
  const { item, index, remove } = props;

  function removeItem() {
    if (remove) {
      remove(index);
    }
  }

  return (
    <Box marginVertical="s">
      <Grid variant="row" alignItems="center" justifyContent="space-between">
        <Text color="textDark">{`${index + 1}. ${item.text}`}</Text>
        <Button onPress={removeItem}>
          <Text color="textError">
            <Icon variant="smallSize" icon="remove-circle-outline" />
          </Text>
        </Button>
      </Grid>
    </Box>
  );
};

export default Option;
