import React, { useState } from "react";
import Box from "../Restyle/Box";
import { FlatList } from "react-native-gesture-handler";
import { IndexKeyExtractor } from "../../utils";
import { Word as WordType } from "../../generated/graphql";
import Text from "../Restyle/Text";
import Modal from "../Shared/Modal";
import { TextWithPill } from "./Word";
import Button from "../Restyle/Button";

interface Props {
  words: WordType[];
  visible: boolean;
  toggleModal(): void;
  title: string;
  language: string;
  seeText: string;
  toggleText: string;
}

export const NewWordsModal = (props: Props) => {
  const {
    words,
    visible,
    toggleModal,
    title,
    language,
    seeText,
    toggleText,
  } = props;
  const [seeWords, setSeeWords] = useState(false);
  const renderWord = ({ item, index }: { item: WordType; index: number }) => {
    return (
      <Box marginBottom="12">
        <TextWithPill
          number={index + 1}
          text={item.translate[language]}
          active={true}
        />
      </Box>
    );
  };
  return (
    <Modal visible={visible} toggleModal={toggleModal}>
      <Text variant="modalHeader" marginBottom="m">
        {title}
      </Text>
      <Box maxHeight={260}>
        {seeWords ? (
          <>
            <FlatList
              keyExtractor={IndexKeyExtractor}
              data={words}
              renderItem={renderWord}
            />
            <Button
              label={toggleText}
              variant="primary"
              textVariant="buttonLabelLight"
              onPress={() => toggleModal()}
            />
          </>
        ) : (
          <Button
            label={seeText}
            variant="primaryOutline"
            textVariant="buttonLabelPrimary"
            onPress={() => setSeeWords(!seeWords)}
          />
        )}
      </Box>
    </Modal>
  );
};

export default NewWordsModal;
