import { Flex, Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Translated } from "../generated/graphql";
import { InputField } from "./InputField";
import { Translate } from "./Translate";

interface AddCategoryWordProps {
  addWord(word: Translated): void;
  editWord: Translated;
}

const addCategoryDetailsValues: Translated = {
  PL: "",
  EN: "",
  GER: "",
  ES: "",
  RU: "",
};

export const AddCategoryWord: React.FC<AddCategoryWordProps> = ({
  addWord,
  editWord,
}) => {
  const [initialState, setInitialState] = useState(addCategoryDetailsValues);

  const handleSubmit = async (data: Translated) => {
    addWord(data);
    setInitialState(addCategoryDetailsValues);
  };

  const validation = () => {};

  const updateTranslations = (data: Translated) => {
    setInitialState(data);
  };

  useEffect(() => {
    if (editWord) {
      setInitialState(editWord);
    }
  }, [editWord]);

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
                name="EN"
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
                name="PL"
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
                name="ES"
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
                name="GER"
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
                name="RU"
                placeholder="Name (RU)..."
                type="text"
                label="Name (RU)"
              />
            </Box>
          </Flex>
          <Flex justifyContent="flex-end">
            <Translate
              text={props.values}
              updateTranslations={updateTranslations}
            />
            <Button
              w="140px"
              type="submit"
              isDisabled={!props.isValid}
              ml="20px"
            >
              {editWord ? "SAVE" : "ADD"}
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
