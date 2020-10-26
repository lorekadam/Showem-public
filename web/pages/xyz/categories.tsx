import React from "react";
import { NextPage } from "next";
import { useAuth } from "../../hooks/useAuth";
import { Box, Container, Heading, Spinner } from "@chakra-ui/core";
import Wrapper from "../../components/Wrapper";
import { useGetAllCategoriesQuery } from "../../generated/graphql";
import { CategoryRow } from "../../components/CategoryRow";

interface CategoriesProps {}

export const Categories: NextPage<CategoriesProps> = ({}) => {
  const isLogged = useAuth();
  const { data, loading } = useGetAllCategoriesQuery();
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
        >
          <Heading as="h2" size="lg" fontWeight="400" mb="20px">
            Categories
          </Heading>
          {loading ? (
            <Spinner />
          ) : (
            <Box
              borderRadius="lg"
              overflow="hidden"
              border="1px solid"
              borderColor="InputBorderColor"
            >
              {data.getAllCategories.map((category, index) => (
                <CategoryRow
                  key={category.id}
                  category={category}
                  index={index + 1}
                  last={index + 1 === data.getAllCategories.length}
                />
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Wrapper>
  );
};

export default Categories;
