import React from "react";
import {
  Box,
  Button,
  Heading,
  Flex,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { InputField } from "../../components/InputField";
import { useChangePasswordMutation } from "../../generated/graphql";
import { NextPage } from "next";
import { HiCheck } from "react-icons/hi";

import { useTranslation } from "../../i18n";
import Wrapper from "../../components/Wrapper";

interface ChangePasswordFormValues {
  password: string;
  repeatPassword: string;
  global?: string;
}

type FormErrors = Partial<ChangePasswordFormValues>;

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const { t } = useTranslation();
  const [
    changePassword,
    { loading, error, data },
  ] = useChangePasswordMutation();

  const initialValues: ChangePasswordFormValues = {
    password: "",
    repeatPassword: "",
  };

  const handleSubmit = async (values: ChangePasswordFormValues) => {
    await changePassword({
      variables: { token, newPassword: values.password },
    }).catch(() => {});
  };

  const validation = (values: ChangePasswordFormValues) => {
    const errors: FormErrors = {};
    if (!values.password) {
      errors.password = t("required");
    } else if (!values.repeatPassword) {
      errors.repeatPassword = t("required");
    } else if (values.password !== values.repeatPassword) {
      errors.global = t("noPasswordsMatch");
    }
    return errors;
  };

  return (
    <Wrapper>
      <Flex
        minH="calc(100vh - 80px)"
        justifyContent="center"
        alignItems="center"
        py={10}
      >
        <Box
          backgroundColor="white"
          borderRadius="lg"
          padding="2rem"
          maxW="500px"
          w="90%"
          boxShadow="0 0 20px 0px rgba(60,87,198,0.12)"
        >
          {data ? (
            <Flex justifyContent="center">
              <Box as={HiCheck} name="check" size="200px" color="green.400" />
            </Flex>
          ) : (
            <>
              <Heading
                as="h2"
                size="lg"
                textAlign="center"
                mb={8}
                fontFamily="poppins"
                color="primary.600"
                letterSpacing={2}
              >
                {t("changePassword").toUpperCase()}
              </Heading>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validate={validation}
              >
                {({ errors, isValid }) => (
                  <Form>
                    <InputField
                      name="password"
                      placeholder={t("password")}
                      type="password"
                      label={t("newPassword")}
                    />
                    <Box mt={4}>
                      <InputField
                        name="repeatPassword"
                        placeholder={t("password")}
                        type="password"
                        label={t("repeatPassword")}
                      />
                      {errors.global ? (
                        <FormControl isInvalid={!!errors.global}>
                          <FormErrorMessage>{errors.global}</FormErrorMessage>
                        </FormControl>
                      ) : null}
                    </Box>
                    <Box mt={4}>
                      <Button
                        w="100%"
                        type="submit"
                        colorScheme="primary"
                        letterSpacing={2}
                        isLoading={loading}
                        fontWeight={500}
                        isDisabled={!isValid}
                      >
                        {t("change").toUpperCase()}
                      </Button>
                    </Box>
                    {error && (
                      <FormControl isInvalid={!!error}>
                        <FormErrorMessage>{t(error.message)}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Form>
                )}
              </Formik>
            </>
          )}
        </Box>
      </Flex>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
