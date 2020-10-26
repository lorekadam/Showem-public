import {
  BackgroundColorProps,
  LayoutProps,
  OpacityProps,
  PositionProps,
  SpacingProps,
  VariantProps,
  backgroundColor,
  createRestyleComponent,
  createVariant,
  layout,
  opacity,
  position,
  spacing,
} from "@shopify/restyle";

import { Theme } from "../../styled/theme";

type Props = SpacingProps<Theme> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  PositionProps<Theme> &
  VariantProps<Theme, "gridVariants"> & { children?: React.ReactNode };
const Grid = createRestyleComponent<Props>([
  layout,
  spacing,
  backgroundColor,
  opacity,
  position,
  createVariant({ themeKey: "gridVariants" }),
]);

export default Grid;
