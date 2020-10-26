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
  color,
  ColorProps,
} from "@shopify/restyle";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import React from "react";
import { Theme } from "../../styled/theme";

const variant = createVariant<Theme>({ themeKey: "iconVariants" });

const restyleFunctions = [spacing, border, backgroundColor, variant, color];
type Props = SpacingProps<Theme> &
  BorderProps<Theme> &
  VariantProps<Theme, "iconVariants"> &
  ColorProps<Theme> &
  BackgroundColorProps<Theme> & {
    icon: string;
    type?: "material" | "materialCommunity";
  };

const Icon = ({ type, icon, ...rest }: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  if (type === "materialCommunity") {
    return (
      <MaterialCommunityIcons
        name={icon}
        size={props.style[0].fontSize}
        color={props.style[0].color}
      />
    );
  }
  return (
    <MaterialIcons
      name={icon}
      size={props.style[0].fontSize}
      color={props.style[0].color}
    />
  );
};

export default Icon;
