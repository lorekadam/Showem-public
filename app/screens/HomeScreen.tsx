import * as screens from "../screens";

import React, { useContext } from "react";

import BasicView from "./BasicView";
import Box from "../components/Restyle/Box";
import Button from "../components/Restyle/Button";
import Grid from "../components/Restyle/Grid";
import { NavigationProps } from "../types";
import { RootStoreContext } from "../stores/RootStore";
import Text from "../components/Restyle/Text";
import { observer } from "mobx-react-lite";

const Background = require(`../../assets/img/drawable-xxxhdpi/home_bg.png`);

const HomeScreen = observer((props: NavigationProps) => {
  const rootStore = useContext(RootStoreContext);
  const { navigate } = props.navigation;
  const { userStore, gameStore } = rootStore;

  return (
    <BasicView background={Background} back language settings>
      <Grid variant="column" height="100%">
        <Grid variant="elementCenter" flex={5}>
          <Text variant="logo" marginTop="xxxl">
            Showem
          </Text>
        </Grid>
        <Grid variant="element" flex={6}>
          <Grid variant="column" padding="l">
            <Box marginBottom="s">
              <Button
                variant="secondary"
                onPress={() => navigate(screens.NEW_GAME)}
                label={userStore.t("newGame")}
              />
            </Box>
            {gameStore.gameStarted && (
              <Box marginBottom="s">
                <Button
                  variant="primary"
                  onPress={() => navigate(screens.GAME)}
                  label={userStore.t("resumeGame")}
                />
              </Box>
            )}
            <Box marginBottom="s">
              <Button
                variant="primaryOutline"
                textVariant="buttonLabelPrimary"
                onPress={() => navigate(screens.SETTINGS)}
                label={userStore.t("getWords")}
              />
            </Box>
            <Button
              variant="transparent"
              textVariant="buttonLabelSecondary"
              onPress={() => navigate(screens.HOW_TO_PLAY)}
              label={userStore.t("howToPlay")}
              lowercase={true}
            />
          </Grid>
        </Grid>
      </Grid>
    </BasicView>
  );
});

export default HomeScreen;
