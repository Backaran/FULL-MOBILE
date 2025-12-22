import React, { ReactElement, useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import Icon, { IconSize, IconType } from '../Icon';
import CheckboxInput, { CheckboxInputState } from '../Inputs/CheckboxInput';
import styles from './styles';
import List, { ListItem } from '../List';

export enum SelectionState {
  NotSelected = 0,
  Selected = 1,
}

interface SelectionListProps<T extends ListItem> {
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
 * Selection List component
 * @param items items used be rendered
 * @param selectedIds items selected (default: [])
 * @param loading show a loading indicator
 * @param editMode used to show selection, actions and for renderItem (default: false)
 * @param showMore if the showMore button is shown (default: false)
 * @param showEmpty if the showEmpty message is shown (default: false)
 * @param error error to be shown
 * @param onSelectionChange action to be trigger when selection change
 * @param onSearchMore action to be trigger when reaching end of list
 * @param onDuplicateItems action to be trigger when duplication icon pressed with current selection
 * @param onDeleteItems action to be trigger when delete icon pressed with current selection
 * @param renderItem used for item rendering
 * @returns component
 */
const SelectionList = <T extends ListItem>({
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
}: SelectionListProps<T>) => {

  const selectedIdsSet = useMemo(
    () => new Set(selectedIds),
    [selectedIds]
  );

  const getCheckboxState = useCallback((): CheckboxInputState => {
    return selectedIds.length === 0
      ? CheckboxInputState.Unselected
      : selectedIds.length === items.length
        ? CheckboxInputState.Selected
        : CheckboxInputState.Intermediate
  }, [selectedIds, items.length]);

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

  const _renderItem = useCallback((item: T) => {
    return renderItem(
      item,
      editMode,
      selectedIdsSet.has(item.id),
      onItemSelectionChange
    );
  }, [renderItem, editMode, selectedIdsSet, onItemSelectionChange]);

  const _onDuplicate = useCallback(() => {
    onDuplicate(selectedIds);
  }, [onDuplicate, selectedIds]);

  const _onDelete = useCallback(() => {
    onDelete(selectedIds)
  }, [onDelete, selectedIds]);

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
              size={IconSize.Medium}
              disabled={selectedIds.length === 0}
              onPress={_onDuplicate}
            />
            <Icon
              type={IconType.Delete}
              size={IconSize.Medium}
              disabled={selectedIds.length === 0}
              onPress={_onDelete}
            />
          </View>
        </View>
      )}
      <List<T>
        items={items}
        loading={loading}
        showMore={showMore}
        showEmpty={showEmpty}
        error={error}
        onSearchMore={onSearchMore}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default React.memo(SelectionList) as typeof SelectionList;
