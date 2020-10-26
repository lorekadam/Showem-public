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

import React from "react";
import { Theme } from "../../styled/theme";
import { View } from "react-native";

const variant = createVariant<Theme>({ themeKey: "radioVariants" });

const restyleFunctions = [spacing, border, backgroundColor, variant];
type Props = SpacingProps<Theme> &
  BorderProps<Theme> &
  VariantProps<Theme, "radioVariants"> &
  BackgroundColorProps<Theme>;

const Radio = ({ ...rest }: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  const thisStyle = props.style[0];
  return (
    <View {...props}>
      <View
        style={{
          width: thisStyle.width / 2,
          height: thisStyle.height / 2,
          borderRadius: thisStyle.borderRadius,
          backgroundColor:
            rest.variant === "inactive" ? "transparent" : thisStyle.borderColor,
        }}
      />
    </View>
  );
};

export default Radio;
