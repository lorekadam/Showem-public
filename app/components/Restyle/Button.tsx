import {
  BackgroundColorProps,
  BorderProps,
  LayoutProps,
  OpacityProps,
  PositionProps,
  SpacingProps,
  VariantProps,
  backgroundColor,
  border,
  createVariant,
  layout,
  opacity,
  position,
  spacing,
  useRestyle,
} from "@shopify/restyle";
import { TouchableOpacity, View } from "react-native";

import React from "react";
import Text from "./Text";
import { Theme } from "../../styled/theme";

const variant = createVariant<Theme>({ themeKey: "buttonVariants" });

const restyleFunctions = [
  spacing,
  border,
  backgroundColor,
  variant,
  opacity,
  position,
  layout,
];
type Props = SpacingProps<Theme> &
  BorderProps<Theme> &
  VariantProps<Theme, "buttonVariants"> &
  OpacityProps<Theme> &
  PositionProps<Theme> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme> & {
    onPress: () => void;
    label?: string;
    lowercase?: boolean;
    textVariant?: keyof Theme["textVariants"];
    children?: React.ReactNode;
    disabled?: boolean;
  };

const Button = ({
  onPress,
  label,
  lowercase,
  textVariant,
  children,
  disabled,
  ...rest
}: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{ opacity: disabled ? 0.6 : 1 }}
    >
      <View {...props}>
        {label && (
          <Text variant={textVariant || "buttonLabel"}>
            {lowercase ? label : label.toUpperCase()}
          </Text>
        )}
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
