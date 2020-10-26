import React, { useContext, useEffect, useState } from "react";
import { getQlError, validateEmail } from "../utils";

import BasicView from "./BasicView";
import Box from "../components/Restyle/Box";
import Button from "../components/Restyle/Button";
import Input from "../components/Restyle/Input";
import { KeyboardAvoidingView } from "react-native";
import Loader from "../components/Shared/Loader";
import { LoginBackground } from "./LoginScreen";
import { RootStoreContext } from "../stores/RootStore";
import Text from "../components/Restyle/Text";
import { useForgotPasswordMutation } from "../generated/graphql";

export const ForgotPasswordScreen = () => {
  const rootStore = useContext(RootStoreContext);
  const { userStore } = rootStore;
  const [
    forgotPassword,
    { loading, error, data },
  ] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");

  const handlePasswordReset = () => {
    forgotPassword({ variables: { email } }).catch(() => {});
  };

  useEffect(() => {
    if (data) {
      const { forgotPassword } = data;
      if (forgotPassword) {
        setEmail("");
      }
    }
  }, [data]);

  if (loading) return <Loader fullscreen />;
  return (
    <BasicView background={LoginBackground} back>
      <KeyboardAvoidingView behavior="padding">
        <Box padding="l" paddingTop="0" justifyContent="center" height="100%">
          <Text variant="heading" textAlign="center" marginBottom="m">
            {userStore.t("forgotPassword")}
          </Text>
          <Text variant="subheading" textAlign="center" marginBottom="m">
            {userStore.t("forgotPasswordDisclaimer")}
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
            marginBottom="m"
          />
          <Button
            variant="secondary"
            onPress={handlePasswordReset}
            disabled={!validateEmail(email)}
            label={userStore.t("send")}
          />
          {data && data.forgotPassword && (
            <Text variant="textSecondary" marginTop="s">
              {userStore.t(data.forgotPassword)}
            </Text>
          )}
          {error && (
            <Text variant="textError" marginTop="s">
              {userStore.t(getQlError(error))}
            </Text>
          )}
        </Box>
      </KeyboardAvoidingView>
    </BasicView>
  );
};

export default ForgotPasswordScreen;
