import React, { ReactNode } from "react";

import Box from "../components/Restyle/Box";

interface Props {
  children: ReactNode;
}

export const ScreenPanelHeading = ({ children }: Props) => {
  return <Box padding="l">{children}</Box>;
};

export default ScreenPanelHeading;
