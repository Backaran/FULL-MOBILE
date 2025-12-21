import { Image, View } from 'react-native';
import styles from './styles';

interface AvatarProps {
  /** url of image to be displayed */
  url: string;
};

/**
 * Avatar component
 * @param url url of image to be displayed
 * @returns component
 */
const Avatar = ({ url }: AvatarProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: url }} />
    </View>
  );
};

export default Avatar;
