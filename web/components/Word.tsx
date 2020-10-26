import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
} from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import {
  useAdminUpdateWordMutation,
  Word as WordType,
} from "../generated/graphql";
import { InputField } from "./InputField";

interface WordProps {
  word: WordType;
}

export const Word: React.FC<WordProps> = ({ word }) => {
  const [
    adminUpdateWordMutation,
    { data, loading, error },
  ] = useAdminUpdateWordMutation();

  const validation = () => {};

  const handleSubmit = async (data: WordType) => {
    await adminUpdateWordMutation({
      variables: { word: data },
    });
  };
  return (
    <>
      <Formik
        initialValues={word}
        onSubmit={handleSubmit}
        validate={validation}
      >
        {(props) => (
          <Form>
            <Flex margin="0 -10px" flexWrap="wrap">
              <Box
                paddingX="10px"
                marginBottom="20px"
                width={["100%", "50%", "33.333333%"]}
              >
                <InputField
                  name="translate.EN"
                  placeholder="Name (EN)..."
                  type="text"
                  label="Name (EN)"
                />
              </Box>
              <Box
                paddingX="10px"
                marginBottom="20px"
                width={["100%", "50%", "33.333333%"]}
              >
                <InputField
                  name="translate.PL"
                  placeholder="Name (PL)..."
                  type="text"
                  label="Name (PL)"
                />
              </Box>
              <Box
                paddingX="10px"
                marginBottom="20px"
                width={["100%", "50%", "33.333333%"]}
              >
                <InputField
                  name="translate.ES"
                  placeholder="Name (ES)..."
                  type="text"
                  label="Name (ES)"
                />
              </Box>
              <Box
                paddingX="10px"
                marginBottom="20px"
                width={["100%", "50%", "33.333333%"]}
              >
                <InputField
                  name="translate.GER"
                  placeholder="Name (GER)..."
                  type="text"
                  label="Name (GER)"
                />
              </Box>
              <Box
                paddingX="10px"
                marginBottom="20px"
                width={["100%", "50%", "33.333333%"]}
              >
                <InputField
                  name="translate.RU"
                  placeholder="Name (RU)..."
                  type="text"
                  label="Name (RU)"
                />
              </Box>
            </Flex>
            <Flex justifyContent="flex-end">
              <Button
                w="140px"
                type="submit"
                isLoading={loading}
                isDisabled={!props.isValid}
              >
                SAVE
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
      {data && (
        <Alert mt="20px" status={data.adminUpdateWord ? "success" : "error"}>
          <AlertIcon />
          <AlertDescription>
            {data.adminUpdateWord ? "Success" : error}
          </AlertDescription>
        </Alert>
      )}
      <Box
        width="100%"
        marginY="20px"
        bgColor="InputBorderColor"
        height="1px"
      ></Box>
    </>
  );
};
