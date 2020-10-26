import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Switch,
} from "@chakra-ui/core";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import {
  Category,
  Icons as IconsType,
  Translated,
  useAdminUpdateCategoryMutation,
} from "../generated/graphql";
import { InputField } from "./InputField";
import { Translate } from "./Translate";

interface EditCategoryProps {
  category: Category;
}

export const Icons = {
  ...IconsType,
};

export const EditCategory: React.FC<EditCategoryProps> = ({ category }) => {
  const [
    adminUpdateCategoryMutation,
    { data, loading, error },
  ] = useAdminUpdateCategoryMutation();

  const [initialState, setInitialState] = useState(category);

  const handleSubmit = async (data: Category) => {
    await adminUpdateCategoryMutation({
      variables: { category: data },
    });
  };

  const validation = () => {};

  const updateTranslations = (data: Translated) => {
    const { __typename, ...rest } = data;
    setInitialState({
      ...initialState,
      translate: {
        ...initialState.translate,
        ...rest,
      },
    });
  };

  return (
    <>
      <Formik
        initialValues={initialState}
        onSubmit={handleSubmit}
        validate={validation}
        enableReinitialize={true}
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
              <Box
                width="100%"
                marginY="20px"
                marginX="10px"
                bgColor="InputBorderColor"
                height="1px"
              ></Box>
              <Box
                paddingX="10px"
                marginBottom="20px"
                width={["100%", "50%", "33.333333%"]}
              >
                <Field name="icon">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="icon">Icon</FormLabel>
                      <Select
                        {...field}
                        id="icon"
                        name="icon"
                        borderColor="InputBorderColor"
                      >
                        {Object.keys(Icons).map((icon) => (
                          <option key={icon} value={Icons[icon]}>
                            {Icons[icon]}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Box
                paddingX="10px"
                marginBottom="20px"
                width={["100%", "50%", "33.333333%"]}
              >
                <Field name="basic">
                  {({ field }) => (
                    <FormControl
                      as={Flex}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <FormLabel htmlFor="basic">Basic category</FormLabel>
                      <Switch
                        {...field}
                        isChecked={field.value}
                        name="basic"
                        size="lg"
                        colorScheme="primary"
                        id="basic"
                      />
                    </FormControl>
                  )}
                </Field>
              </Box>
            </Flex>
            <Flex justifyContent="flex-end">
              <Translate
                text={props.values.translate}
                updateTranslations={updateTranslations}
              />
              <Button
                ml="20px"
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
        <Alert
          mt="20px"
          status={data.adminUpdateCategory ? "success" : "error"}
        >
          <AlertIcon />
          <AlertDescription>
            {data.adminUpdateCategory ? "Success" : error}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
