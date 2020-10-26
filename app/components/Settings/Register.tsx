import * as Linking from "expo-linking";

import { LOGIN, SETTINGS } from "../../screens";
import React, { useContext, useEffect, useState } from "react";
import { getQlError, setTokens, validateEmail } from "../../utils";

import Box from "../Restyle/Box";
import Button from "../Restyle/Button";
import Checkbox from "../Restyle/Checkbox";
import Grid from "../Restyle/Grid";
import Input from "../Restyle/Input";
import { KeyboardAvoidingView } from "react-native";
import Loader from "../Shared/Loader";
import { NavigationProps } from "../../types";
import { PRIVACY_POLICY_URL } from "../../globals";
import { RootStoreContext } from "../../stores/RootStore";
import Text from "../Restyle/Text";
import { observer } from "mobx-react-lite";
import { useRegisterMutation } from "../../generated/graphql";
import { withNavigation } from "react-navigation";

export const Register = observer((props: NavigationProps) => {
  const rootStore = useContext(RootStoreContext);
  const { userStore } = rootStore;
  const { navigate } = props.navigation;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [policy, setPolicy] = useState(false);
  const [register, { loading, error, data }] = useRegisterMutation();

  const handleRegister = () => {
    register({ variables: { email, password } }).catch(() => {});
  };

  const openPrivacyPolicy = () => {
    Linking.openURL(PRIVACY_POLICY_URL);
  };

  useEffect(() => {
    if (data) {
      const { access_token, refresh_token } = data.register;
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
      <Box padding="l" paddingTop="0" height="100%" justifyContent="center">
        <Text variant="heading" textAlign="center" marginBottom="m">
          {userStore.t("signUp")}
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
        <Input
          variant="default"
          inputProps={{
            placeholder: userStore.t("confirmPasswordPlaceholder"),
            placeholderTextColor: "#353a58",
            secureTextEntry: true,
            onChangeText: (text) => setConfirmPassword(text),
            value: confirmPassword,
            autoCompleteType: "password",
          }}
          marginBottom="m"
        />
        <Grid variant="row" alignItems="center" marginBottom="l">
          <Button
            variant="transparentWrapper"
            onPress={() => setPolicy(!policy)}
          >
            <Grid variant="row" alignItems="center">
              <Checkbox
                variant={policy ? "primary" : "inactive"}
                active={policy}
              />
              <Text>{userStore.t("agreeWith")} </Text>
            </Grid>
          </Button>
          <Button onPress={openPrivacyPolicy} variant="textPrimary">
            <Text variant="textPrimary" textDecorationLine="underline">
              {userStore.t("privacyPolicy")}
            </Text>
          </Button>
        </Grid>
        <Button
          variant="secondary"
          onPress={handleRegister}
          disabled={
            !validateEmail(email) ||
            password.length === 0 ||
            (password.length > 0 && password !== confirmPassword) ||
            !policy
          }
          label={userStore.t("signUp")}
          marginBottom={error ? "s" : "l"}
        />
        {error && (
          <Text variant="textError" marginBottom="s">
            {userStore.t(getQlError(error))}
          </Text>
        )}
        <Grid variant="row" justifyContent="center" marginBottom="l">
          <Text>{userStore.t("haveAccount")} </Text>
          <Button onPress={() => navigate(LOGIN)} variant="textPrimary">
            <Text variant="textPrimary" textDecorationLine="underline">
              {userStore.t("signIn")}
            </Text>
          </Button>
        </Grid>
      </Box>
    </KeyboardAvoidingView>
  );
});

export default withNavigation(Register);
