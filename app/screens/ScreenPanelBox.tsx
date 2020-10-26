import React, { ReactNode } from "react";

import Box from "../components/Restyle/Box";

interface Props {
  children: ReactNode;
}

export const ScreenPanelBox = ({ children }: Props) => {
  return (
    <Box
      borderTopLeftRadius="panel"
      borderTopRightRadius="panel"
      backgroundColor="white"
      flex={1}
      overflow="hidden"
      position="relative"
    >
      {children}
    </Box>
  );
};

export default ScreenPanelBox;
