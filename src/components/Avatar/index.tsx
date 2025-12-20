import { Image, View } from 'react-native';
import styles from './styles';

type AvatarProps = {
  url: string;
}

const Avatar = ({
  url,
}: AvatarProps) => {

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: url }}
      />
    </View>
  );
}

export default Avatar;
