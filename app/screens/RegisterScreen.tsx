import BasicView from "./BasicView";
import { LoginBackground } from "./LoginScreen";
import React from "react";
import Register from "../components/Settings/Register";

export const RegisterScreen = () => {
  return (
    <BasicView background={LoginBackground} back>
      <Register />
    </BasicView>
  );
};

export default RegisterScreen;
