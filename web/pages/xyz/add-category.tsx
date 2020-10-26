import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useAuth } from "../../hooks/useAuth";
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/core";
import Wrapper from "../../components/Wrapper";
import { AddCategoryDetails } from "../../components/AddCategoryDetails";
import {
  Category,
  Translated,
  useAdminCreateCategoryWithWordsMutation,
} from "../../generated/graphql";
import { AddCategoryWord } from "../../components/AddCategoryWord";
import {
  addToLocalStorage,
  isLocalStorage,
  removeLocalStorage,
} from "../../utils";
import { AddCategoryWordsList } from "../../components/AddCategoryWordsList";
import { useRouter } from "next/router";

interface AddCategoryProps {}

const STORAGE_WORDS_KEY = "category-words";
export const STORAGE_CATEGORY_KEY = "category-details";

export const AddCategory: NextPage<AddCategoryProps> = ({}) => {
  const isLogged = useAuth();
  const router = useRouter();
  const [category, setCategory] = useState<Category>(null);
  const [words, setWords] = useState<Translated[]>([]);
  const [editWord, setEditWord] = useState<Translated>(null);
  const [editIndex, setEditIndex] = useState(null);

  const [
    createCategoryWithWords,
    { loading },
  ] = useAdminCreateCategoryWithWordsMutation();

  const saveCategoryDetails = (category: Category) => {
    setCategory(category);
    if (category === null) {
      removeLocalStorage(STORAGE_CATEGORY_KEY);
    }
  };

  const addCategory = async () => {
    const res = await createCategoryWithWords({
      variables: { category, words },
    });
    if (res.data.adminCreateCategoryWithWords) {
      router.push(
        `/admin-panel/category/${res.data.adminCreateCategoryWithWords}`
      );
    }
  };

  const clearAll = () => {
    setCategory(null);
    setWords([]);
    removeLocalStorage(STORAGE_WORDS_KEY);
    removeLocalStorage(STORAGE_CATEGORY_KEY);
  };

  const addWord = (word: Translated) => {
    if (editIndex !== null) {
      const updated = [...words];
      updated[editIndex] = word;
      setWords(updated);
    } else {
      setWords([...words, word]);
    }
    setEditWord(null);
    setEditIndex(null);
  };

  const removeWord = (index: number) => {
    const toRemove = [...words];
    toRemove.splice(index, 1);
    setWords(toRemove);
    if (toRemove.length === 0) {
      removeLocalStorage(STORAGE_WORDS_KEY);
    }
  };

  const startEditWord = (index: number) => {
    setEditIndex(index);
    setEditWord(words[index]);
  };

  const sendValidation = () => {
    if (category === null) {
      return true;
    } else {
      const { EN, PL, ES, GER, RU } = category.translate;
      if (
        EN.length === 0 ||
        PL.length === 0 ||
        ES.length === 0 ||
        GER.length === 0 ||
        RU.length === 0
      ) {
        return true;
      }
    }
    if (words.length < 50) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (words.length > 0) {
      addToLocalStorage(STORAGE_WORDS_KEY, JSON.stringify(words));
    }
  }, [words]);

  useEffect(() => {
    if (category) {
      addToLocalStorage(STORAGE_CATEGORY_KEY, JSON.stringify(category));
    }
  }, [category]);

  useEffect(() => {
    const fromStorageCategory = isLocalStorage(STORAGE_CATEGORY_KEY);
    if (fromStorageCategory) {
      setCategory(JSON.parse(fromStorageCategory));
    }
    const fromStorage = isLocalStorage(STORAGE_WORDS_KEY);
    if (fromStorage) {
      setWords(JSON.parse(fromStorage));
    }
  }, []);

  return (
    <Wrapper navbar={{ isLogged }}>
      <Container maxW="xl">
        <Box
          backgroundColor="white"
          borderRadius="lg"
          padding="2rem"
          boxShadow="0 0 20px 0px rgba(60,87,198,0.12)"
          flex={1}
          display="flex"
          flexDirection="column"
          mb="40px"
        >
          <Flex justifyContent="flex-end">
            <Button width="200px" colorScheme="red" onClick={clearAll}>
              CLEAR ALL
            </Button>
          </Flex>
          <Heading as="h2" size="lg" fontWeight="400" mb="20px">
            Category details
          </Heading>
          <Box>
            <AddCategoryDetails
              saveCategoryDetails={saveCategoryDetails}
              category={category}
            />
          </Box>
        </Box>
        <Box
          backgroundColor="white"
          borderRadius="lg"
          padding="2rem"
          boxShadow="0 0 20px 0px rgba(60,87,198,0.12)"
          flex={1}
          display="flex"
          flexDirection="column"
          mb="40px"
        >
          <Heading as="h2" size="lg" fontWeight="400" mb="20px">
            Add word ({words.length})
          </Heading>
          <Box>
            <AddCategoryWord addWord={addWord} editWord={editWord} />
          </Box>
        </Box>
        <Box
          backgroundColor="white"
          borderRadius="lg"
          padding="2rem"
          boxShadow="0 0 20px 0px rgba(60,87,198,0.12)"
          flex={1}
          display="flex"
          flexDirection="column"
          mb="40px"
        >
          <Heading as="h2" size="lg" fontWeight="400" mb="20px">
            Words
          </Heading>
          <Box>
            <AddCategoryWordsList
              words={words}
              setEditWord={startEditWord}
              removeWord={removeWord}
            />
          </Box>
        </Box>
        <Box
          backgroundColor="white"
          borderRadius="lg"
          padding="2rem"
          boxShadow="0 0 20px 0px rgba(60,87,198,0.12)"
          flex={1}
          mb="40px"
        >
          {category && (
            <Box>
              <Heading size="sm">Name</Heading>
              <Text>EN: {category.translate.EN}</Text>
              <Text>PL: {category.translate.PL}</Text>
              <Text>ES: {category.translate.ES}</Text>
              <Text>GER: {category.translate.GER}</Text>
              <Text>RU: {category.translate.RU}</Text>
              <Text>Icon: {category.icon}</Text>
              <Text>Basic: {category.basic ? "Yes" : "No"}</Text>
              <Text>Words {words.length}</Text>
            </Box>
          )}
          <Flex justifyContent="center" mt="50px">
            <Button
              size="lg"
              disabled={sendValidation()}
              onClick={addCategory}
              isLoading={loading}
            >
              SEND TO DATABASE
            </Button>
          </Flex>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default AddCategory;
