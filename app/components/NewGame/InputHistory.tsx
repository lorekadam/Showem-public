import React from "react";
import PillOptionsList from "../Game/PillOptionsList";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../stores/RootStore";
import Button from "../Restyle/Button";
import Text from "../Restyle/Text";
import Box from "../Restyle/Box";

interface Props {
  onPress: (text: string) => void;
}

export const InputHistory = observer((props: Props) => {
  const rootStore = React.useContext(RootStoreContext);
  const { userStore, historyStore } = rootStore;
  const { onPress } = props;

  const clearHistory = () => {
    historyStore.historyOptions = {};
  };

  const removeHistoryOption = (text: string) => {
    historyStore.removeHistory(text);
  };

  return (
    Object.keys(historyStore.historyOptions).length > 0 && (
      <Box>
        <Button
          variant="transparentWrapper"
          onPress={clearHistory}
          marginBottom="s"
        >
          <Text color="textPrimary" textDecorationLine="underline">
            {userStore.t("clearHistory")}
          </Text>
        </Button>
        <Box marginBottom="m">
          {Object.keys(historyStore.historyOptions).length > 0 && (
            <PillOptionsList
              onPress={onPress}
              onClose={removeHistoryOption}
              data={Object.keys(historyStore.historyOptions)}
            />
          )}
        </Box>
      </Box>
    )
  );
});

export default InputHistory;
