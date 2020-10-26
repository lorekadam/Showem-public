import React from "react";
import { FlatList } from "react-native";
import { IndexKeyExtractor } from "../../utils";
import Box from "../Restyle/Box";
import Button from "../Restyle/Button";
import Icon from "../Restyle/Icon";
import Text from "../Restyle/Text";

interface Props {
  data: string[];
  onPress: (text: string) => void;
  onClose: (text: string) => void;
}

export default function PillOptionsList(props: Props) {
  const { data, onPress, onClose } = props;
  return (
    <FlatList
      horizontal
      keyExtractor={IndexKeyExtractor}
      data={data}
      renderItem={({ item }) => (
        <>
          <Button variant="pill" onPress={() => onPress(item)} marginRight="s">
            <Text fontSize={12}>{item}</Text>
          </Button>
          <Box position="absolute" right={14} top={5} zIndex="1">
            <Button
              onPress={() => onClose(item)}
              padding="xxs"
              backgroundColor="logo"
              borderRadius="xl"
            >
              <Icon variant="extraSmallSize" icon="close" color="textLight" />
            </Button>
          </Box>
        </>
      )}
    />
  );
}
