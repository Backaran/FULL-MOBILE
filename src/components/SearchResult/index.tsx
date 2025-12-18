import { ReactElement, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

enum SelectionState {
  NotSelected = 0,
  Selected = 1,
}

interface Result {
  id: string | number;
}

type SearchResultProps<T extends Result> = {
  items?: T[];
  editMode?: boolean;
  renderItem: (
    d: T,
    editMode: boolean,
    onSelectionChanged?: (id: (string | number), state: SelectionState) => void
  ) => ReactElement;
}

const SearchResult = <T extends Result,>({
  items = [],
  editMode = false,
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

  return (
    <View>
      <Text>
        <Text>{selectedIds.length}</Text>elements selected
      </Text>
      <FlatList<T>
        data={items}
        keyExtractor={(item: T) => item.id.toString()}
        renderItem={({ item }) => renderItem(item, editMode, onSelectionChanged)}
        ListEmptyComponent={(
          <Text>Empty</Text>
        )}
      />
    </View>
  );
}

export default SearchResult;