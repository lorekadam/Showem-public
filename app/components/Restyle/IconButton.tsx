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
import { TouchableOpacity, View } from "react-native";

import Icon from "./Icon";
import React from "react";
import { Theme } from "../../styled/theme";

const variant = createVariant<Theme>({ themeKey: "iconButtonVariants" });

const restyleFunctions = [spacing, border, backgroundColor, variant];
type Props = SpacingProps<Theme> &
  BorderProps<Theme> &
  VariantProps<Theme, "iconButtonVariants"> &
  BackgroundColorProps<Theme> & {
    onPress: () => void;
    icon: string;
    type?: "material" | "materialCommunity";
    iconVariant: keyof Theme["iconVariants"];
    disabled?: boolean;
  };

const IconButton = ({
  onPress,
  icon,
  iconVariant,
  type,
  disabled,
  ...rest
}: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View {...props}>
        <Icon icon={icon} variant={iconVariant} type={type || "material"} />
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;
