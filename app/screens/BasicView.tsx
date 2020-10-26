import AppHeader, { AppHeaderProps } from "../components/Shared/AppHeader";
import { ImageBackground, ImageSourcePropType, ScrollView } from "react-native";
import React, { ReactNode } from "react";
import { windowHeight, windowWidth } from "../utils";

import Box from "../components/Restyle/Box";
import { Theme } from "../styled/theme";

interface Props extends AppHeaderProps {
  background?: ImageSourcePropType;
  backgroundColor?: keyof Theme["colors"];
  children: ReactNode;
  hideNavigation?: boolean;
}

export default function BasicView(props: Props) {
  const {
    background,
    backgroundColor,
    children,
    hideNavigation,
    ...rest
  } = props;
  const content = () => (
    <React.Fragment>
      {hideNavigation ? null : <AppHeader {...rest} />}
      {children}
    </React.Fragment>
  );
  if (background) {
    return (
      <ImageBackground
        source={background}
        resizeMode="stretch"
        style={{ width: windowWidth(), height: windowHeight() }}
      >
        {content()}
      </ImageBackground>
    );
  } else {
    return (
      <Box backgroundColor={backgroundColor} minHeight="100%">
        {content()}
      </Box>
    );
  }
}
