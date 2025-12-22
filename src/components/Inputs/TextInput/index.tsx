import { TextInput as BaseTextInput, View } from 'react-native';
import styles from './styles';
import React, { useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';

interface TextInputProps {
  /** initial search value */
  initialValue?: string;
  /** action to be trigger after search changed */
  onChange: (search: string) => void;
  /** placeholder of input */
  placeholder?: string;
  /** delay before trigger change, without subsequent change  */
  debouceDelayInMs?: number;
};

/**
 * TextInput component
 * @param initialValue initial search value (default: '')
 * @param onChanged action to be trigger after search changed
 * @param placeholder placeholder of input (default: 'Search Input')
 * @param debouceDelayInMs delay before trigger change, without subsequent change
 * @returns component
 */
const TextInput = ({
  initialValue = '',
  onChange,
  placeholder = '',
  debouceDelayInMs,
}: TextInputProps) => {
  const [value, setValue] = useState<string>(initialValue);

  useDebounce<string>(
    onChange,
    value,
    debouceDelayInMs
  );

  return (
    <View style={styles.container}>
      <BaseTextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
}

export default React.memo(TextInput);
