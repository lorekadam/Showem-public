import React, { useState } from "react";
import {
  useRandomCategoryWordsMutation,
  RandomCategoryWordsMutation,
} from "../../generated/graphql";
import Loader from "../Shared/Loader";
import Button from "../Restyle/Button";
import Box from "../Restyle/Box";
import Text from "../Restyle/Text";
import RewardedAd from "./RewardedAd";

interface Props {
  id: string;
  numberOfRolls: number;
  text?: string;
  setWordAsHave: (
    wordsIds: RandomCategoryWordsMutation["randomCategoryWords"]
  ) => void;
}

export const RandomCategoryWords = (props: Props) => {
  const { text, numberOfRolls, id } = props;
  const [adModal, setAdModal] = useState(false);
  const [
    randomCategoryWords,
    { loading, error },
  ] = useRandomCategoryWordsMutation({
    update: (_, response) => {
      props.setWordAsHave(response.data.randomCategoryWords);
    },
  });
  const canRoll = numberOfRolls > 1;

  const random = () => {
    setAdModal(false);
    randomCategoryWords({
      variables: { category: id },
    });
  };
  if (loading)
    return (
      <Box justifyContent="center" alignItems="center">
        <Loader color="secondaryButtonBackground" />
      </Box>
    );
  return (
    <Box position="relative" paddingRight="20">
      {adModal && (
        <RewardedAd
          visible={adModal}
          toggleModal={() => setAdModal(!adModal)}
          successAction={random}
        />
      )}
      <Button
        label={text}
        textVariant={canRoll ? "textSecondaryUnderlineSmall" : "textLightSmall"}
        lowercase
        onPress={() => setAdModal(true)}
        disabled={!canRoll}
      />
      <Box
        position="absolute"
        top={-5}
        right={0}
        backgroundColor={canRoll ? "secondaryButtonBackground" : "white"}
        width={14}
        height={14}
        borderRadius="xxl"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize={10} variant={canRoll ? "textLight" : "textDark"}>
          {numberOfRolls}
        </Text>
      </Box>
    </Box>
  );
};

export default RandomCategoryWords;

// return loading ? (
//   <MyButton backgroundColor={colors.blue}>
//     <Loader />
//   </MyButton>
// ) : (
//   <MyButton backgroundColor={colors.blue} onPress={() => random(props.id)}>
//     {props.text && <Text color={colors.light}>{props.text}</Text>}
//     <MarginView left={1}>
//       <Feather name="refresh-ccw" color={colors.light} size={18} />
//     </MarginView>
//   </MyButton>
// );
