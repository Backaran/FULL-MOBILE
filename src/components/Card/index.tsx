import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import CheckboxInput, { CheckboxInputState } from '../Inputs/CheckboxInput';
import styles from './styles';

interface CardProps {
  /** if card can be selected */
  editMode?: boolean;
  /** if card is selected */
  selected?: boolean;
  /** action when card is selected */
  onPress?: () => void;
  /** children rendered inside the component */
  children: ReactNode;
};

/**
 * Card component
 * @param editMode if card can be selected (default: false)
 * @param selected if card is selected (default: false)
 * @param onPress action when card is selected
 * @returns component
 */
const Card = ({
  editMode = false,
  selected = false,
  onPress,
  children
}: CardProps) => {
  return (
    <Pressable disabled={!onPress} onPress={onPress}>
      <View style={styles.container}>
        {editMode && (
          <View style={styles.selectionContainer}>
            <CheckboxInput value={selected ? CheckboxInputState.Selected : CheckboxInputState.Unselected} />
          </View>
        )}
        {children}
      </View>
    </Pressable>
  );
};

export default Card;
