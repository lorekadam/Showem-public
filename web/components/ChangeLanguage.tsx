import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@chakra-ui/core";
import { NextPage } from "next";
import React from "react";
import { fullLanguages, useTranslation } from "../i18n";

interface ChangeLanguageProps {}

export const ChangeLanguage: NextPage<ChangeLanguageProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { i18n } = useTranslation();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box paddingY="24px">
              <RadioGroup
                onChange={(e) => i18n.changeLanguage(`${e}`)}
                value={i18n.language}
              >
                {fullLanguages.map(({ id, full }) => (
                  <Radio colorScheme="primary" key={id} value={id}>
                    {full}
                  </Radio>
                ))}
              </RadioGroup>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box
        width="40px"
        height="40px"
        display="flex"
        borderRadius="50%"
        backgroundColor="white"
        onClick={onOpen}
        color="primary"
        fontWeight={500}
        justifyContent="center"
        alignItems="center"
        fontSize="18px"
        cursor="pointer"
      >
        {i18n.language.toUpperCase()}
      </Box>
    </>
  );
};

export default ChangeLanguage;
