import BasicView from "../../screens/BasicView";
import Categories from "./Categories";
import React from "react";

const Settings = () => {
  return (
    <BasicView
      backgroundColor="screenBackground"
      back
      home
      language
      logOut
      light
    >
      <Categories />
    </BasicView>
  );
};

export default Settings;
