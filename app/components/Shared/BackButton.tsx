import Grid from "../Restyle/Grid";
import { HOME } from "../../screens";
import IconButton from "../Restyle/IconButton";
import { NavigationProps } from "../../types";
import React from "react";
import { withNavigation } from "react-navigation";

interface Props extends NavigationProps {
  light?: boolean;
  home?: boolean;
}

function BackButton(props: Props) {
  return (
    <Grid variant="row">
      <IconButton
        onPress={() => props.navigation.goBack()}
        iconVariant={props.light ? "light" : "dark"}
        icon="arrow-back"
      />
      {props.home && (
        <IconButton
          onPress={() => props.navigation.navigate(HOME)}
          iconVariant={props.light ? "light" : "dark"}
          icon="home"
          marginLeft="s"
        />
      )}
    </Grid>
  );
}

export default withNavigation(BackButton);
