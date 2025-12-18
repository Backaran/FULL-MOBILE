import { ReactElement, useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

enum SelectionState {
  NotSelected = 0,
  Selected = 1,
}

interface Result {
  id: string | number;
}

type SearchResultProps<T extends Result> = {
  items?: T[];
  lastPage: number;
  loading: boolean;
  editMode?: boolean;
  onSearchMore: (page: number) => void;
  renderItem: (
    d: T,
    editMode: boolean,
    onSelectionChanged?: (id: (string | number), state: SelectionState) => void
  ) => ReactElement;
}

const SearchResult = <T extends Result,>({
  items = [],
  lastPage,
  loading,
  editMode = false,
  onSearchMore,
  renderItem
}: SearchResultProps<T>) => {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  const onSelectionChanged = (id: (string | number), state: SelectionState) => {
    if (state === SelectionState.NotSelected) {
      setSelectedIds((ids) => ids.filter(_id => _id !== id));
    } else {
      setSelectedIds((ids) => [...ids, id]);
    }
  };

  const onEndReached = useCallback(() => {
    if (items.length > 0) {
      onSearchMore(lastPage + 1);
    }
  }, [onSearchMore, lastPage, items]);

  return (
    <View>
      <Text>
        <Text>{selectedIds.length}</Text> {selectedIds.length > 0 ? 'elements' : 'element'} selected
      </Text>
      <FlatList<T>
        data={items}
        keyExtractor={(item: T) => item.id.toString()}
        renderItem={({ item }) => renderItem(item, editMode, onSelectionChanged)}
        ListEmptyComponent={(
          <Text>Empty</Text>
        )}
        onEndReached={onEndReached}
        ListFooterComponent={!loading ? null : (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchResult;
