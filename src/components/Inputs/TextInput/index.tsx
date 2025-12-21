import { TextInput as BaseTextInput, View } from 'react-native';
import styles from './styles';
import React, { useEffect, useRef, useState } from 'react';

interface TextInputProps {
  /** initial search value */
  initialValue?: string;
  /** action to be trigger after search changed */
  onChange: (search: string) => void;
  /** placeholder of input */
  placeholder?: string;
  /** delay before trigger on change, without subsequent change  */
  debouceDelayInMs?: number;
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
  onChange,
  placeholder = '',
  debouceDelayInMs,
}: TextInputProps) => {
  const firstRender = useRef(true);
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!debouceDelayInMs) {
      onChange(value);
      return;
    }

    const timeout = setTimeout(() => {
      onChange(value);
    }, debouceDelayInMs);

    return () => { clearTimeout(timeout); };
  }, [value, debouceDelayInMs, onChange]);

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
