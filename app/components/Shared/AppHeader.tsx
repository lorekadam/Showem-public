import { HOME, SETTINGS } from "../../screens";
import React, { useContext } from "react";

import BackButton from "./BackButton";
import Grid from "../Restyle/Grid";
import IconButton from "../Restyle/IconButton";
import LanguagesSwitch from "./LanguagesSwitch";
import { NavigationProps } from "../../types";
import { RootStoreContext } from "../../stores/RootStore";
import { withNavigation } from "react-navigation";
import Icon from "../Restyle/Icon";
import Box from "../Restyle/Box";

export interface AppHeaderProps {
  language?: boolean;
  home?: boolean;
  logOut?: boolean;
  settings?: boolean;
  light?: boolean;
  back?: boolean;
}

type Props = AppHeaderProps & NavigationProps;

export const AppHeader = (props: Props) => {
  const rootStore = useContext(RootStoreContext);
  const { userStore, categoryStore, gameStore, historyStore } = rootStore;
  const { navigate } = props.navigation;
  const color = props.light ? "light" : "dark";

  const logOut = () => {
    categoryStore.reset();
    gameStore.reset();
    historyStore.reset();
    userStore.logOut();
    navigate(HOME);
  };

  return (
    <Grid
      variant="row"
      justifyContent={props.back ? "space-between" : "flex-end"}
      alignItems="center"
      padding="s"
      paddingLeft="m"
      paddingRight="m"
    >
      <Grid variant="row" alignItems="center">
        {props.back && <BackButton home={props.home} light={props.light} />}
        {!userStore.internet && (
          <Box marginLeft="s">
            <Icon icon="signal-wifi-off" variant={color} />
          </Box>
        )}
      </Grid>
      <Grid variant="row" alignItems="center">
        {props.language && <LanguagesSwitch light={props.light} />}
        {props.logOut && (
          <IconButton
            iconVariant={color}
            onPress={logOut}
            icon="exit-to-app"
            marginRight="s"
          />
        )}
        {props.settings && (
          <IconButton
            iconVariant={color}
            onPress={() => navigate(SETTINGS)}
            icon="settings"
          />
        )}
      </Grid>
    </Grid>
  );
};

export default withNavigation(AppHeader);
