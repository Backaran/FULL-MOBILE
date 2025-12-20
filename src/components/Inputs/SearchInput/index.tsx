import { forwardRef, useImperativeHandle, useState } from 'react';
import { TextInput, View } from 'react-native';
import useDebounce from '../../../hooks/useDebounce';
import styles from './styles';

export type SearchInputRefProps = {
  getSearch: () => string;
};

type SearchInputProps = {
  delayInMs?: number;
  onSearch: (search: string) => void;
  placeholder?: string;
};

const SearchInput = forwardRef<SearchInputRefProps, SearchInputProps>(
  ({ delayInMs = 500, onSearch, placeholder = 'Search Input' }, ref) => {
    const [search, setSearch] = useState<string>('');

    useImperativeHandle(ref, () => ({
      getSearch: () => search,
    }));

    useDebounce(search, onSearch, delayInMs);

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          value={search}
          onChangeText={setSearch}
        />
      </View>
    );
  },
);

export default SearchInput;
