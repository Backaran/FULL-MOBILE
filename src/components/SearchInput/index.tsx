import { useState } from 'react';
import { TextInput } from 'react-native';
import { useDebounceEffect } from '../../effects/useDebounceEffect';

type SearchInputProps<T> = {
  delayInMs?: number;
  onSearchStart: (search: string, signal: AbortSignal) => Promise<T[]>;
  onSearchEnd: (result?: T[]) => void;
}

const SearchInput = <T,>({
  delayInMs = 500,
  onSearchStart,
  onSearchEnd
}: SearchInputProps<T>) => {
  const [search, setSearch] = useState('');

  useDebounceEffect<T[], string>(
    search,
    (_search) => !_search,
    onSearchStart,
    onSearchEnd,
    delayInMs
  );

  return (
    <TextInput
      value={search}
      onChangeText={setSearch}
    />
  );
}

export default SearchInput;