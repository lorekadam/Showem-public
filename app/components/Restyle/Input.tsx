import {
  BackgroundColorProps,
  BorderProps,
  SpacingProps,
  VariantProps,
  backgroundColor,
  border,
  createVariant,
  spacing,
  useRestyle,
} from "@shopify/restyle";
import { TextInput, TextInputProps } from "react-native";

import React from "react";
import { Theme } from "../../styled/theme";

const variant = createVariant<Theme>({ themeKey: "inputVariants" });

const restyleFunctions = [spacing, border, backgroundColor, variant];
type Props = SpacingProps<Theme> &
  BorderProps<Theme> &
  VariantProps<Theme, "inputVariants"> &
  BackgroundColorProps<Theme> & {
    inputProps: TextInputProps;
  };

const Input = ({ inputProps, ...rest }: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  return <TextInput {...inputProps} {...props} />;
};

export default Input;
