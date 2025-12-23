import { Pressable, View } from 'react-native';
import React, { useCallback } from 'react';
import styles from './styles';
import Icon, { IconType } from '../../Icon';

export enum CheckboxInputState {
  Unselected = 'Unselected',
  Selected = 'Selected',
  Intermediate = 'Intermediate',
}

interface CheckboxInputProps {
  /** value of the checkbox */
  value: CheckboxInputState;
  /** if input can be pressed */
  disabled?: boolean;
  /** action to be trigger on press */
  onChanged?: (state: CheckboxInputState) => void;
};

/**
 * CheckboxInput component
 * @param value value of the checkbox
 * @param disabled if input can be pressed (default: false)
 * @param onChanged action to be trigger on press (default: undefined)
 * @returns component
 */
const CheckboxInput = ({
  value,
  disabled = false,
  onChanged,
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

  const getIcon = useCallback(() => {
    let iconType: IconType | undefined;
    switch (value) {
      case CheckboxInputState.Selected:
        iconType = IconType.Ok;
        break;
      case CheckboxInputState.Intermediate:
        iconType = IconType.Minus;
        break;
    }
    if (!iconType) {
      return null;
    }
    return (
      <Icon
        type={iconType}
        disabled
      />
    );
  }, [value]);

  return (
    <Pressable disabled={disabled || !onChanged} onPress={onPress}>
      <View
        style={[
          styles.container,
          disabled ? styles.containerDisabled : styles.containerEnabled,
        ]}
      >
        {getIcon()}
      </View>
    </Pressable>
  );
};

export default React.memo(CheckboxInput);
