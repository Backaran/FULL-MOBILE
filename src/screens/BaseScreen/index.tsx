import { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';

interface BaseScreenProps {
  /** text title of the screen */
  title: string;
  /** children rendered inside the screen */
  children: ReactNode;
};

/**
 * Base screen of app
 * @param title text displayed in screen header
 * @param children children rendered inside the screen
 * @return component
 */
const BaseScreen = ({ title, children }: BaseScreenProps) => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: safeAreaInsets.top,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right,
      }}
    >
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default BaseScreen;
