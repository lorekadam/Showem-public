import React from "react";
import { Box } from "@chakra-ui/core";

interface PageBackgroundProps {}

export const PageBackground: React.FC<PageBackgroundProps> = ({ children }) => {
  return (
    <Box
      minHeight="100vh"
      background="url(/img/bg.svg) no-repeat center center"
      backgroundSize="cover"
      paddingTop={20}
      position="relative"
    >
      <Box maxW="1400px" margin="0 auto">
        {children}
      </Box>
    </Box>
  );
};
