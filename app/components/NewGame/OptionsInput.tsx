import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Box from "../Restyle/Box";
import Input from "../Restyle/Input";
import { RootStoreContext } from "../../stores/RootStore";
import Button from "../Restyle/Button";
import Icon from "../Restyle/Icon";

interface State {
  value: string;
}

interface Props {
  add: (value: State["value"]) => void;
}

export const OptionsInput = observer((props: Props) => {
  const rootStore = React.useContext(RootStoreContext);
  const { userStore } = rootStore;
  const [value, setValue] = useState<State["value"]>("");

  const updateValue = (value: State["value"]) => {
    setValue(value);
  };

  const addOption = () => {
    props.add(value);
    setValue("");
  };

  return (
    <Box position="relative">
      <Input
        variant="player"
        inputProps={{
          placeholder: userStore.t("nameOrNick"),
          placeholderTextColor: "#353a58",
          value,
          onChangeText: updateValue,
        }}
      />
      <Box position="absolute" right={7} bottom={7} zIndex="1">
        <Button
          onPress={addOption}
          disabled={value.length === 0}
          width={32}
          height={32}
          backgroundColor="textPrimary"
          borderRadius="xl"
          justifyContent="center"
          alignItems="center"
        >
          <Icon variant="light" icon="add" />
        </Button>
      </Box>
    </Box>
  );
});

export default OptionsInput;
