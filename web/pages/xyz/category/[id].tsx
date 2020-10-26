import React from "react";
import { NextPage } from "next";
import { useAuth } from "../../../hooks/useAuth";
import { Box, Container, Heading, Spinner, Textarea } from "@chakra-ui/core";
import Wrapper from "../../../components/Wrapper";
import { useAdminGetCategoryQuery } from "../../../generated/graphql";
import { EditCategory } from "../../../components/EditCategory";
import { WordsList } from "../../../components/WordsList";

interface CategoryProps {
  id: string;
}

export const Category: NextPage<CategoryProps> = ({ id }) => {
  const isLogged = useAuth();
  const { data, loading, error } = useAdminGetCategoryQuery({
    variables: {
      categoryId: id,
    },
  });
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
          <Heading as="h2" size="lg" fontWeight="400" mb="20px">
            Category
          </Heading>
          {loading ? (
            <Spinner />
          ) : (
            <Box>
              <EditCategory category={data.adminGetCategory.category} />
            </Box>
          )}
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
            Category Words
          </Heading>
          {loading ? (
            <Spinner />
          ) : (
            <Box>
              <WordsList words={data.adminGetCategory.words} />
            </Box>
          )}
        </Box>
        {data?.adminGetCategory?.category?.basic && (
          <Box
            backgroundColor="white"
            borderRadius="lg"
            padding="2rem"
            boxShadow="0 0 20px 0px rgba(60,87,198,0.12)"
            flex={1}
            display="flex"
            flexDirection="column"
          >
            <Textarea
              value={JSON.stringify(data.adminGetCategory)}
              readOnly
              borderColor="InputBorderColor"
              backgroundColor="InputBorderColor"
            ></Textarea>
          </Box>
        )}
      </Container>
    </Wrapper>
  );
};

Category.getInitialProps = ({ query }) => {
  return {
    id: query.id as string,
  };
};

export default Category;
