import { Image, Pressable, View } from 'react-native';
import styles from './styles';

export enum IconType {
  Delete = 'Delete',
  Duplicate = 'Duplicate',
}

export enum IconSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

type IconProps = {
  type: IconType,
  disabled?: boolean;
  size?: IconSize,
  onPress?: () => void;
}

const Icon = ({
  type,
  disabled = false,
  size = IconSize.Small,
  onPress,
}: IconProps) => {
  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <View style={disabled ? styles.iconDisabled : styles.iconEnabled}>
        <Image style={getIconSizeStyle(size)} source={getIconImage(type)} />
      </View>
    </Pressable>
  );
}

const getIconImage = (type: IconType): any => {
  switch (type) {
    case IconType.Delete:
      return require('./images/delete.png');
    case IconType.Duplicate:
      return require('./images/duplicate.png');
  }
};

const getIconSizeStyle = (size: IconSize) => {
  switch (size) {
    case IconSize.Small:
      return styles.iconSmall;
    case IconSize.Medium:
      return styles.iconMedium;
    case IconSize.Large:
      return styles.iconLarge;
  }
}

export default Icon;