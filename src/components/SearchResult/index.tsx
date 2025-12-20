import { forwardRef, ReactElement, useCallback, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import Icon, { IconType } from '../Icon';
import CheckboxInput, { CheckboxInputState } from '../Inputs/CheckboxInput';
import styles from './styles';

export enum SelectionState {
  NotSelected = 0,
  Selected = 1,
}

interface Result {
  id: string | number;
}

export type SearchResultRefProps = {
  resetSelection: (ids?: (string | number)[]) => void;
}

type SearchResultProps<T extends Result> = {
  items?: T[];
  currentPage: number;
  maxPage: number;
  loading: boolean;
  editMode?: boolean;
  onSearchMore: (page: number) => void;
  onDuplicateItems: (itemsToDuplicate: T[]) => void;
  onDeleteItems: (itemsToDelete: T[]) => void;
  renderItem: (
    item: T,
    editMode: boolean,
    selected: boolean,
    onSelectionChanged: (id: string | number, state: SelectionState) => void,
  ) => ReactElement;
};

const SearchResultInner = <T extends Result>(
  {
    items,
    currentPage,
    maxPage,
    loading,
    editMode = false,
    onSearchMore,
    renderItem,
  }: SearchResultProps<T>,
  ref: React.Ref<SearchResultRefProps>,
) => {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  useImperativeHandle(ref, () => ({
    resetSelection: (idsToDelete) => setSelectedIds((ids) => {
      if (idsToDelete) {
        return ids.filter(x => !idsToDelete.includes(x));
      }
      return [];
    }),
  }));

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
    if (currentPage !== maxPage) {
      onSearchMore(currentPage + 1);
    }
  }, [onSearchMore, currentPage, maxPage]);

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
        renderItem={({ item }) => renderItem(item, editMode, selectedIds.includes(item.id), onSelectionChanged)}
        ListEmptyComponent={renderEmpty}
        onEndReached={onEndReached}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const SearchResult = forwardRef(SearchResultInner) as <T extends Result>(
  props: SearchResultProps<T> & {
    ref?: React.Ref<SearchResultRefProps>;
  },
) => ReactElement;

export default SearchResult;
