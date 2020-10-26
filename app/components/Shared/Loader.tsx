import { color as RestyleColor, useRestyle } from "@shopify/restyle";

import { ActivityIndicator } from "react-native-paper";
import Grid from "../Restyle/Grid";
import React from "react";
import { Theme } from "../../styled/theme";

interface Props {
  fullscreen?: boolean;
  color?: keyof Theme["colors"];
}

export const Loader = (props: Props) => {
  const { fullscreen, color } = props;
  const restyle = useRestyle([RestyleColor], { color: color || "textPrimary" });
  return (
    <Grid variant={fullscreen ? "columnCenter" : "element"} flex={1}>
      <ActivityIndicator
        size={fullscreen ? 80 : "small"}
        animating={true}
        color={restyle.style[0].color}
      />
    </Grid>
  );
};

export default Loader;
