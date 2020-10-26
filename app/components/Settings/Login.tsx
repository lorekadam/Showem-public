import { FORGOT_PASSWORD, REGISTER, SETTINGS } from "../../screens";
import React, { useContext, useEffect, useState } from "react";
import { getQlError, setTokens, validateEmail } from "../../utils";

import Box from "../Restyle/Box";
import Button from "../Restyle/Button";
import Grid from "../Restyle/Grid";
import Input from "../Restyle/Input";
import { KeyboardAvoidingView } from "react-native";
import Loader from "../Shared/Loader";
import LogInWithServices from "./LogInWithServices";
import { NavigationProps } from "../../types";
import { RootStoreContext } from "../../stores/RootStore";
import Text from "../Restyle/Text";
import { observer } from "mobx-react-lite";
import { useLoginMutation } from "../../generated/graphql";
import { withNavigation } from "react-navigation";

export const Login = observer((props: NavigationProps) => {
  const rootStore = useContext(RootStoreContext);
  const { userStore } = rootStore;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error, data }] = useLoginMutation();
  const { navigate } = props.navigation;

  const handleLogin = () => {
    login({ variables: { email, password } }).catch(() => {});
  };

  useEffect(() => {
    if (data) {
      const { access_token, refresh_token } = data.login;
      userStore.user = {
        logged: true,
      };
      setTokens(access_token, refresh_token);
      navigate(SETTINGS);
    }
  }, [data]);

  if (loading) return <Loader fullscreen />;
  return (
    <KeyboardAvoidingView behavior="padding">
      <Box padding="l" paddingTop="0" justifyContent="center" height="100%">
        <Text variant="heading" textAlign="center" marginBottom="m">
          {userStore.t("logIn")}
        </Text>
        <Text variant="subheading" textAlign="center" marginBottom="m">
          {userStore.t("logInBenefit")}
        </Text>
        <Input
          variant="default"
          inputProps={{
            placeholder: userStore.t("emailPlaceholder"),
            placeholderTextColor: "#353a58",
            onChangeText: (text) => setEmail(text),
            value: email,
            autoCompleteType: "email",
          }}
          marginBottom="s"
        />
        <Input
          variant="default"
          inputProps={{
            placeholder: userStore.t("passwordPlaceholder"),
            placeholderTextColor: "#353a58",
            secureTextEntry: true,
            onChangeText: (text) => setPassword(text),
            value: password,
            autoCompleteType: "password",
          }}
          marginBottom="s"
        />
        <Grid variant="row" justifyContent="flex-end" marginBottom="l">
          <Button
            onPress={() => navigate(FORGOT_PASSWORD)}
            variant="textPrimary"
          >
            <Text variant="textPrimary" textDecorationLine="underline">
              {userStore.t("forgotPassword")}
            </Text>
          </Button>
        </Grid>
        <Button
          variant="secondary"
          onPress={handleLogin}
          disabled={!validateEmail(email) || password.length === 0}
          label={userStore.t("logInButton")}
          marginBottom={error ? "s" : "m"}
        />
        {error && (
          <Text variant="textError" marginBottom="s">
            {userStore.t(getQlError(error))}
          </Text>
        )}
        <Text variant="subheading" textAlign="center" marginBottom="m">
          {userStore.t("orUse")}
        </Text>
        <Box marginBottom="xl">
          <LogInWithServices />
        </Box>
        <Grid variant="row" justifyContent="center">
          <Text>{userStore.t("noAccount")} </Text>
          <Button onPress={() => navigate(REGISTER)} variant="textPrimary">
            <Text variant="textPrimary" textDecorationLine="underline">
              {userStore.t("signUp")}
            </Text>
          </Button>
        </Grid>
      </Box>
    </KeyboardAvoidingView>
  );
});

export default withNavigation(Login);
