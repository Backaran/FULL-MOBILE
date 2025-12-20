import { ReactElement, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import styles from './styles';
import Icon, { IconType } from '../Icon';
import CheckboxInput, { CheckboxInputState } from '../Inputs/CheckboxInput';

export enum SelectionState {
  NotSelected = 0,
  Selected = 1,
}

interface Result {
  id: string | number;
}

type SearchResultProps<T extends Result> = {
  items?: T[];
  total: number;
  currentPage: number;
  loading: boolean;
  editMode?: boolean;
  onSearchMore: (page: number) => void;
  renderItem: (
    item: T,
    editMode: boolean,
    selected: boolean,
    onSelectionChanged?: (id: string | number, state: SelectionState) => void,
  ) => ReactElement;
};

const SearchResult = <T extends Result>({
  items,
  total,
  currentPage,
  loading,
  editMode = false,
  onSearchMore,
  renderItem,
}: SearchResultProps<T>) => {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  useEffect(() => {
    setSelectedIds([]);
  }, [items]);

  const onCheckboxChanged = useCallback(
    (state: CheckboxInputState) => {
      setSelectedIds(() => {
        if (state === CheckboxInputState.Selected) {
          return items?.map(x => x.id) || [];
        }
        return [];
      });
    },
    [setSelectedIds, items],
  );

  const onSelectionChanged = useCallback(
    (id: string | number, state: SelectionState) => {
      setSelectedIds(ids => {
        if (state === SelectionState.NotSelected) {
          return ids.filter(_id => _id !== id);
        }
        return [...ids, id];
      });
    },
    [setSelectedIds],
  );

  const onEndReached = useCallback(() => {
    if (items && items.length !== total) {
      onSearchMore(currentPage + 1);
    }
  }, [onSearchMore, currentPage, items, total]);

  const renderEmpty = useCallback(() => {
    if (!items || loading) {
      return null;
    }
    return <Text style={styles.emptyResultText}>No Result</Text>;
  }, [items, loading]);

  const renderFooter = useCallback(() => {
    if (!loading) {
      return null;
    }
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }, [loading]);

  return (
    <View style={styles.container}>
      {editMode && (
        <View style={styles.header}>
          <View style={styles.selectionContainer}>
            <CheckboxInput
              value={
                selectedIds.length === 0
                  ? CheckboxInputState.Unselected
                  : selectedIds.length === items?.length
                    ? CheckboxInputState.Selected
                    : CheckboxInputState.Intermediate
              }
              onChanged={onCheckboxChanged}
              disabled={!items || items?.length === 0}
            />
            <Text style={styles.selectionText}>
              <Text style={styles.selectionCountText}>{selectedIds.length}</Text>{' '}
              {selectedIds.length > 1 ? 'elements' : 'element'} selected
            </Text>
          </View>
          <View style={styles.actionsContainer}>
            <Icon type={IconType.Duplicate} disabled={selectedIds.length === 0} />
            <Icon type={IconType.Delete} disabled={selectedIds.length === 0} />
          </View>
        </View>
      )}
      <FlatList<T>
        data={items}
        style={styles.resultContainer}
        keyExtractor={(item: T) => item.id.toString()}
        renderItem={({ item }) =>
          renderItem(item, editMode, selectedIds.includes(item.id), onSelectionChanged)
        }
        ListEmptyComponent={renderEmpty}
        onEndReached={onEndReached}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default SearchResult;
