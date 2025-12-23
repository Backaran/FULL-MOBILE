import { Image, Pressable, View } from 'react-native';
import styles from './styles';
import React, { useCallback } from 'react';

export enum IconType {
  Ok = 'Ok',
  Cancel = 'Cancel',
  Delete = 'Delete',
  Duplicate = 'Duplicate',
  Minus = 'Minus',
}

export enum IconSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

interface IconProps {
  /** type of icon */
  type: IconType;
  /** if icon can be pressed */
  disabled?: boolean;
  /** size of icon */
  size?: IconSize;
  /** display icone with a rounded background */
  rounded?: boolean;
  /** action to be trigger on press */
  onPress?: () => void;
};

/**
 * Icon component
 * @param type type of icon
 * @param disabled if icon can be pressed (default: false)
 * @param size size of icon (default: IconSize.Small)
 * @param rounded display icone with a rounded background (default: false)
 * @param onPress action to be trigger on press
 * @returns component
 */
const Icon = ({
  type,
  disabled = false,
  size = IconSize.Small,
  rounded = false,
  onPress
}: IconProps) => {

  const getIconImage = useCallback((): any => {
    switch (type) {
      case IconType.Ok:
        return require('./images/ok.png');
      case IconType.Cancel:
        return require('./images/cancel.png');
      case IconType.Delete:
        return require('./images/delete.png');
      case IconType.Duplicate:
        return require('./images/duplicate.png');
      case IconType.Minus:
        return require('./images/minus.png');
    }
  }, [type]);

  const getIconSizeStyle = useCallback(() => {
    switch (size) {
      case IconSize.Small:
        return styles.iconSmall;
      case IconSize.Medium:
        return styles.iconMedium;
      case IconSize.Large:
        return styles.iconLarge;
    }
  }, [size]);

  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <View style={[
        disabled ? styles.iconDisabled : styles.iconEnabled,
        rounded && styles.iconRounded,
      ]}>
        <Image style={getIconSizeStyle()} source={getIconImage()} />
      </View>
    </Pressable>
  );
};

export default React.memo(Icon);
