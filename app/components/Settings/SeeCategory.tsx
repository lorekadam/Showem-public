import React from "react";
import Illustration4 from "../../../assets/img/drawable/illustration_4.svg";
import Box from "../Restyle/Box";
import Text from "../Restyle/Text";
import Button from "../Restyle/Button";
import { BuyCategory } from "./BuyCategory";

interface Props {
  text: string;
  seeText: string;
  seeAction(): void;
  bought: boolean;
}

export const SeeCategory = (props: Props) => {
  const { text, seeText, seeAction, bought } = props;
  return (
    <Box
      height="100%"
      width="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding="l"
    >
      <Illustration4 width="55%" height="55%" />
      <Text
        marginVertical="10"
        marginHorizontal="xl"
        variant="textDark"
        fontSize={16}
        textAlign="center"
      >
        {text}
      </Text>
      <Box width="100%">
        <Button
          onPress={seeAction}
          label={seeText}
          variant="primaryOutline"
          textVariant="buttonLabelPrimary"
          marginBottom="s"
        />
      </Box>
      {!bought && (
        <Box width="100%">
          <BuyCategory />
        </Box>
      )}
    </Box>
  );
};

export default SeeCategory;
