import React from "react";
import { NextPage } from "next";
import Wrapper from "../../components/Wrapper";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormErrorMessage,
  Button,
  Icon,
} from "@chakra-ui/core";
import { HiCheck } from "react-icons/hi";
import { Formik, Form } from "formik";
import { InputField } from "../../components/InputField";
import { useAdminLoginMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { setTokens } from "../../utils";

interface LoginProps {}

interface LoginFormValues {
  email: string;
  password: string;
  global?: string;
}

type FormErrors = Partial<LoginFormValues>;

export const Login: NextPage<LoginProps> = ({}) => {
  const router = useRouter();
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const [adminLogin, { loading, error, data }] = useAdminLoginMutation();

  const handleSubmit = async ({ email, password }: LoginFormValues) => {
    const res = await adminLogin({
      variables: { email, password },
    });
    if (res.data.adminLogin) {
      const { access_token, refresh_token } = res.data.adminLogin;
      setTokens(access_token, refresh_token);
      setTimeout(() => {
        router.push("/admin-panel");
      }, 300);
    }
  };

  const validation = (values: LoginFormValues) => {
    const errors: FormErrors = {};
    if (!values.email) {
      errors.email = "E-mail is required";
    } else if (!values.password) {
      errors.password = "Password is required";
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
              <Icon as={HiCheck} boxSize="200px" color="green.400" />
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
                LOGIN
              </Heading>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validate={validation}
              >
                {({ isValid }) => (
                  <Form>
                    <InputField
                      name="email"
                      placeholder="E-mail"
                      type="text"
                      label="E-mail"
                    />
                    <Box mt={4}>
                      <InputField
                        name="password"
                        placeholder="password"
                        type="password"
                        label="Password"
                      />
                    </Box>
                    <Box mt={4}>
                      <Button
                        w="100%"
                        type="submit"
                        isLoading={loading}
                        isDisabled={!isValid}
                      >
                        LOGIN
                      </Button>
                    </Box>
                    {error && (
                      <FormControl isInvalid={!!error}>
                        <FormErrorMessage>{error.message}</FormErrorMessage>
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

export default Login;
