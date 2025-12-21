import { Pressable, Text, View } from 'react-native';
import styles from './styles';

interface ButtonProps {
  /** text of the button */
  title: string;
  /** action to be trigger on button press */
  onPress?: () => void;
};

/**
 * Button component
 * @param title text of the button
 * @param onPress action to be trigger on button press
 * @returns component
 */
const Button = ({
  title,
  onPress
}: ButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
