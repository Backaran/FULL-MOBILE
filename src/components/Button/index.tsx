import { Pressable, Text, View } from 'react-native';
import styles from './styles';

type ButtonProps = {
  title: string;
  enabled?: boolean;
  onPress: () => void;
}

const Button = ({
  title,
  enabled = true,
  onPress,
}: ButtonProps) => {
  return (
    <Pressable onPress={enabled ? onPress : undefined}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
}

export default Button;
