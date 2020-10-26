import React, { useContext } from "react";

import LoginScreen from "./LoginScreen";
import { RootStoreContext } from "../stores/RootStore";
import Settings from "../components/Settings/Settings";
import { observer } from "mobx-react-lite";

const SettingsScreen = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { userStore } = rootStore;

  if (userStore.user.logged) {
    return <Settings />;
  } else {
    return <LoginScreen />;
  }
});

export default SettingsScreen;
