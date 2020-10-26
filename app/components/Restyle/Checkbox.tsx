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

import Icon from "./Icon";
import React from "react";
import { Theme } from "../../styled/theme";
import { View } from "react-native";

const variant = createVariant<Theme>({ themeKey: "checkboxVariants" });

const restyleFunctions = [spacing, border, backgroundColor, variant];
type Props = SpacingProps<Theme> &
  BorderProps<Theme> &
  VariantProps<Theme, "checkboxVariants"> &
  BackgroundColorProps<Theme> & {
    active: boolean;
  };

const Checkbox = ({ active, ...rest }: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  return (
    <View {...props}>{active && <Icon icon="check" variant="checkbox" />}</View>
  );
};

export default Checkbox;
