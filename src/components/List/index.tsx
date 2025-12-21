import React, { ReactElement, useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import Icon, { IconType } from '../Icon';
import CheckboxInput, { CheckboxInputState } from '../Inputs/CheckboxInput';
import styles from './styles';
import Button from '../Button';
import Card from '../Card';

export enum SelectionState {
  NotSelected = 0,
  Selected = 1,
}

interface Result {
  id: string | number;
}

interface ListProps<T extends Result> {
  /** items used be rendered */
  items: T[];
  /** items selected */
  selectedIds?: (string | number)[];
  /** show a loading indicator */
  loading: boolean;
  /** used to show selection, actions and for renderItem */
  editMode?: boolean;
  /** if the showMore button is shown */
  showMore?: boolean;
  /** if the showEmpty message is shown */
  showEmpty?: boolean;
  /** error to be shown */
  error?: string;
  /** action to be trigger when selection change */
  onSelectionChange?: (ids: (string | number)[]) => void;
  /** action to be trigger when reaching end of list */
  onSearchMore: () => void;
  /** action to be trigger when duplication icon pressed with current selection */
  onDuplicate: (ids: (string | number)[]) => void;
  /** action to be trigger when delete icon pressed with current selection */
  onDelete: (ids: (string | number)[]) => void;
  /** used for item rendering */
  renderItem: (
    item: T,
    editMode: boolean,
    selected: boolean,
    onSelectionChanged: (id: string | number, state: SelectionState) => void,
  ) => ReactElement;
};

/**
 * List component
 * @param items items used be rendered
 * @param selectedIds items selected (default: [])
 * @param loading show a loading indicator
 * @param editMode used to show selection, actions and for renderItem (default: false)
 * @param showMore if the showMore button is shown (default: false)
 * @param showEmpty if the showEmpty message is shown (default: false)
 * @param error error to be shown (default: false)
 * @param onSelectionChange action to be trigger when selection change
 * @param onSearchMore action to be trigger when reaching end of list
 * @param onDuplicateItems action to be trigger when duplication icon pressed with current selection
 * @param onDeleteItems action to be trigger when delete icon pressed with current selection
 * @param renderItem used for item rendering
 * @returns component
 */
const List = <T extends Result>({
  items,
  selectedIds = [],
  loading,
  editMode = false,
  showMore = false,
  showEmpty = false,
  error,
  onSelectionChange,
  onSearchMore,
  onDuplicate,
  onDelete,
  renderItem,
}: ListProps<T>) => {

  const selectedIdsSet = useMemo(
    () => new Set(selectedIds),
    [selectedIds]
  );

  const getCheckboxState = (): CheckboxInputState => {
    return selectedIds.length === 0
      ? CheckboxInputState.Unselected
      : selectedIds.length === items.length
        ? CheckboxInputState.Selected
        : CheckboxInputState.Intermediate
  };

  const onCheckboxChange = useCallback((state: CheckboxInputState) => {
    const ids: (string | number)[] = state === CheckboxInputState.Selected
      ? items.map(x => x.id) || []
      : [];
    onSelectionChange && onSelectionChange(ids);
  }, [items, onSelectionChange]);

  const onItemSelectionChange = useCallback((id: string | number, state: SelectionState) => {
    const ids: (string | number)[] = state !== SelectionState.Selected
      ? selectedIds.filter(_id => _id !== id)
      : [...selectedIds.filter(_id => _id !== id), id];
    onSelectionChange && onSelectionChange(ids);
  }, [selectedIds, onSelectionChange]);

  const renderEmpty = useCallback(() => {
    if (loading || !showEmpty) {
      return null;
    }
    return <Text style={styles.emptyResultText}>No Result</Text>;
  }, [loading, showEmpty]);

  const renderFooter = useCallback(() => {
    if (loading) {
      return <ActivityIndicator size={'large'} />
    }
    if (!showMore) {
      return null;
    }
    return (
      <View style={styles.loadMoreContainer}>
        <Button
          title='Load more'
          onPress={() => onSearchMore()}
        />
      </View>
    );
  }, [loading, onSearchMore, showMore]);

  const _renderItem = useCallback(({ item }: { item: T }) => {
    return renderItem(
      item,
      editMode,
      selectedIdsSet.has(item.id),
      onItemSelectionChange
    );
  }, [renderItem, editMode, selectedIdsSet, onItemSelectionChange]);

  return (
    <View style={styles.container}>
      {editMode && (
        <View style={styles.header}>
          <View style={styles.selectionContainer}>
            <CheckboxInput
              value={getCheckboxState()}
              onChanged={onCheckboxChange}
              disabled={items.length === 0}
            />
            <Text style={styles.selectionText}>
              <Text style={styles.selectionCountText}>{selectedIds.length}</Text>{' '}
              {selectedIds.length > 1 ? 'elements' : 'element'} selected
            </Text>
          </View>
          <View style={styles.actionsContainer}>
            <Icon
              type={IconType.Duplicate}
              disabled={selectedIds.length === 0}
              onPress={() => onDuplicate(selectedIds)}
            />
            <Icon
              type={IconType.Delete}
              disabled={selectedIds.length === 0}
              onPress={() => onDelete(selectedIds)}
            />
          </View>
        </View>
      )}
      <FlatList<T>
        data={items}
        keyExtractor={(item: T) => item.id.toString()}
        renderItem={_renderItem}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        contentContainerStyle={[
          styles.resultContainer,
          (items.length === 0) && styles.resultContainerCentered
        ]}
      />
      {error && (
        <Card error={error} dismissOnPress />
      )}
    </View>
  );
};

export default React.memo(List) as typeof List;
