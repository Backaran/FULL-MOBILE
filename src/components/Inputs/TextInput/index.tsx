import { TextInput as BaseTextInput, View } from 'react-native';
import styles from './styles';
import React from 'react';

interface TextInputProps {
  /** initial search value */
  initialValue?: string;
  /** action to be trigger after search changed */
  onChanged: (search: string) => void;
  /** placeholder of input */
  placeholder?: string;
};

/**
 * TextInput component
 * @param initialValue initial search value (default: '')
 * @param onChanged action to be trigger after search changed
 * @param placeholder placeholder of input (default: 'Search Input')
 * @returns component
 */
const TextInput = ({
  initialValue = '',
  onChanged,
  placeholder = 'Search Input'
}: TextInputProps) => {

  return (
    <View style={styles.container}>
      <BaseTextInput
        style={styles.searchInput}
        placeholder={placeholder}
        defaultValue={initialValue}
        onChangeText={(search: string) => onChanged(search)}
      />
    </View>
  );
}

export default React.memo(TextInput);
