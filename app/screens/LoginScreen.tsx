import BasicView from "./BasicView";
import Login from "../components/Settings/Login";
import React from "react";

export const LoginBackground = require(`../../assets/img/drawable-xxxhdpi/login_bg.png`);

export const LoginScreen = () => {
  return (
    <BasicView background={LoginBackground} back>
      <Login />
    </BasicView>
  );
};

export default LoginScreen;
