import Box from "../Restyle/Box";
import Grid from "../Restyle/Grid";
import NativeModal from "react-native-modal";
import React from "react";

interface Props {
  visible: boolean;
  toggleModal(): void;
  children: React.ReactNode;
}

export const Modal = (props: Props) => {
  const { visible, toggleModal, children } = props;
  return (
    <NativeModal isVisible={visible} onBackdropPress={toggleModal}>
      <Grid variant="rowCenter" flex={1} position="relative">
        <Box borderRadius="l" backgroundColor="white" padding="l" flex={1}>
          {children}
        </Box>
      </Grid>
    </NativeModal>
  );
};

export default Modal;
