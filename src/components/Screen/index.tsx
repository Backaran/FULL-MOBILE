import { Text, View } from 'react-native';
import styles from './styles';
import { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type BaseScreenProps = {
  title: string;
  children: ReactNode;
};

const Screen = ({
  title,
  children,
}: BaseScreenProps) => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: safeAreaInsets.top,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right,
      }}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

export default Screen;
