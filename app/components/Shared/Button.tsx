import {
  ButtonStylesProps,
  Button as StyledButton,
} from "../../styled/Buttons";

import React from "react";
import { Text } from "../../styled/v2/Text";

interface Props extends ButtonStylesProps {
  text: string;
  onPress(): void;
  smallText?: boolean;
  transparent?: boolean;
  textGreen?: boolean;
}

export const Button = (props: Props) => {
  const { text, onPress, smallText, ...buttonStyles } = props;
  return (
    <StyledButton onPress={onPress} {...buttonStyles}>
      <Text medium {...buttonStyles}>
        {smallText ? text : text.toLocaleUpperCase()}
      </Text>
    </StyledButton>
  );
};

export default Button;
