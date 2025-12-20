import { Pressable, Text, View } from "react-native";
import { useCallback } from "react";
import styles from "./styles";

export enum CheckboxInputState {
  Unselected = 'Unselected',
  Selected = 'Selected',
  Intermediate = 'Intermediate',
}

type CheckboxInputProps = {
  value: CheckboxInputState;
  disabled?: boolean;
  onChanged?: (state: CheckboxInputState) => void;
}

const CheckboxInput = ({
  value,
  disabled = false,
  onChanged
}: CheckboxInputProps) => {

  const onPress = useCallback(() => {
    if (!disabled && onChanged) {
      switch (value) {
        case CheckboxInputState.Unselected:
          onChanged(CheckboxInputState.Selected);
          break;
        case CheckboxInputState.Selected:
          onChanged(CheckboxInputState.Unselected);
          break;
        case CheckboxInputState.Intermediate:
          onChanged(CheckboxInputState.Selected);
          break;
      }
    }
  }, [disabled, onChanged, value]);

  return (
    <Pressable disabled={disabled || !onChanged} onPress={onPress}>
      <View style={{ ...styles.container, ...(disabled ? styles.containerDisabled : styles.containerEnabled) }}>
        <Text style={styles.text}>{getCheckboxInputText(value)}</Text>
      </View>
    </Pressable>
  )
}

const getCheckboxInputText = (state: CheckboxInputState): string => {
  switch (state) {
    case CheckboxInputState.Unselected:
      return '';
    case CheckboxInputState.Selected:
      return 'X';
    case CheckboxInputState.Intermediate:
      return '-';
  }
}

export default CheckboxInput;
