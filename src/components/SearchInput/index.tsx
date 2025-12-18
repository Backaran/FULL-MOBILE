import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { TextInput, View } from 'react-native';
import useDebounceEffect from '../../hooks/useDebounceEffect';
import styles from './styles';

export type SearchInputRefProps = {
  getSearch: () => string;
}

type SearchInputProps = {
  delayInMs?: number;
  onSearch: (search: string) => void;
  placeholder?: string;
}

const SearchInput = forwardRef<SearchInputRefProps, SearchInputProps>(({
  delayInMs = 500,
  onSearch,
  placeholder = 'Search Input'
}, ref) => {
  const [search, setSearch] = useState<string>('');

  useImperativeHandle(ref, () => ({
    getSearch: () => search,
  }));

  const canStart = useCallback((s: string) => {
    return s.length > 0;
  }, []);

  useDebounceEffect(
    search,
    canStart,
    onSearch,
    delayInMs
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={search}
        onChangeText={(text: string) => {
          setSearch(text);
        }}
      />
    </View>
  );
})

export default SearchInput;
