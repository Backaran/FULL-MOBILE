import React, { ReactNode, useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import CheckboxInput, { CheckboxInputState } from '../Inputs/CheckboxInput';
import styles from './styles';

interface CardProps {
  /** if card can be selected */
  editMode?: boolean;
  /** if card is selected */
  selected?: boolean;
  /** action when card is selected (useless with dismissOnPress) */
  onPress?: () => void;
  /** use to display an error */
  error?: string;
  /** if the card can be hidden on press */
  dismissOnPress?: boolean;
  /** children rendered inside the component */
  children?: ReactNode;
};

/**
 * Card component
 * @param editMode if card can be selected (default: false)
 * @param selected if card is selected (default: false)
 * @param onPress action when card is selected (useless with dismissOnPress)
 * @param error use to display an error
 * @param dismissOnPress if the card can be hidden on press (default: false)
 * @param children children rendered inside the component
 * @returns component
 */
const Card = ({
  editMode = false,
  selected = false,
  onPress,
  error,
  dismissOnPress = false,
  children
}: CardProps) => {
  const [visible, setVisible] = useState<boolean>(true);

  const onCardPress = useCallback(() => {
    if (dismissOnPress) {
      setVisible(false);
    }
    else if (onPress) {
      onPress();
    }
  }, [dismissOnPress, onPress]);

  return visible && (
    <Pressable disabled={!dismissOnPress && !onPress} onPress={onCardPress}>
      <View style={[styles.container, error ? styles.errorContainer : styles.regularContainer]}>
        {editMode && (
          <View style={styles.selectionContainer}>
            <CheckboxInput value={selected ? CheckboxInputState.Selected : CheckboxInputState.Unselected} />
          </View>
        )}
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        {children}
      </View>
    </Pressable>
  );
};

export default React.memo(Card);
