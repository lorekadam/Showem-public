import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';

interface Props {
  number: number;
  update: (number: number) => void;
  disabledAdd?: boolean;
  disabledRemove?: boolean;
}

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default function NumberInput(props: Props) {
  function plus() {
    const { update, number } = props;
    update(number + 1);
  }

  function minus() {
    const { update, number } = props;
    update(number - 1);
  }
  const { number, disabledAdd, disabledRemove } = props;
  return (
    <View style={styles.row}>
      <Text>{number}</Text>
      <IconButton
        icon="add-circle-outline"
        color={Colors.blue700}
        size={20}
        onPress={plus}
        disabled={disabledAdd}
      />
      <IconButton
        icon="remove-circle-outline"
        color={Colors.red700}
        size={20}
        disabled={disabledRemove}
        onPress={minus}
      />
    </View>
  );
}
