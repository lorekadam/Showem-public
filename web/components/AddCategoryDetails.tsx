import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Select,
  Switch,
  Button,
} from "@chakra-ui/core";
import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import { Category, Translated } from "../generated/graphql";
import { Icons } from "./EditCategory";
import { InputField } from "./InputField";
import { Translate } from "./Translate";

interface AddCategoryDetailsProps {
  saveCategoryDetails(category: Category): void;
  category: Category;
}

const addCategoryDetailsValues: Category = {
  id: "",
  translate: {
    id: "",
    PL: "",
    EN: "",
    GER: "",
    ES: "",
    RU: "",
  },
  icon: Icons.Default,
  basic: false,
};

export const AddCategoryDetails: React.FC<AddCategoryDetailsProps> = ({
  saveCategoryDetails,
  category,
}) => {
  const [changed, setChanged] = useState(false);
  const [initialState, setInitialState] = useState(addCategoryDetailsValues);
  const loading = false;

  const handleSubmit = (data: Category) => {
    saveCategoryDetails(data);
    setChanged(false);
  };

  const validation = () => {
    setChanged(true);
  };

  const handleClear = () => {
    setInitialState(addCategoryDetailsValues);
    saveCategoryDetails(null);
  };

  const updateTranslations = (data: Translated) => {
    setChanged(true);
    const { __typename, ...rest } = data;
    setInitialState({
      ...initialState,
      translate: {
        ...initialState.translate,
        ...rest,
      },
    });
  };

  useEffect(() => {
    if (category) {
      setInitialState(category);
    }
    if (category === null) {
      setInitialState(addCategoryDetailsValues);
    }
  }, [category]);

  return (
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
              w="140px"
              colorScheme="gray"
              ml="20px"
              onClick={handleClear}
            >
              CLEAR
            </Button>
            {changed && (
              <Button
                w="140px"
                type="submit"
                isLoading={loading}
                isDisabled={!props.isValid}
                ml="20px"
              >
                SAVE
              </Button>
            )}
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
