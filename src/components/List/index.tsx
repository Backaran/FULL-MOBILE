import React, { ReactElement, useCallback } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import styles from './styles';
import Button from '../Button';
import Card from '../Card';

export interface ListItem {
  id: string | number;
}

interface ListProps<T extends ListItem> {
  /** items used be rendered */
  items: T[];
  /** show a loading indicator */
  loading: boolean;
  /** if the showMore button is shown */
  showMore?: boolean;
  /** if the showEmpty message is shown */
  showEmpty?: boolean;
  /** error to be shown */
  error?: string;
  /** action to be trigger when reaching end of list */
  onSearchMore: () => void;
  /** used for item rendering */
  renderItem: (item: T) => ReactElement;
};

/**
 * Selection List component
 * @param items items used be rendered
 * @param loading show a loading indicator
 * @param showMore if the showMore button is shown (default: false)
 * @param showEmpty if the showEmpty message is shown (default: false)
 * @param error error to be shown
 * @param onSearchMore action to be trigger when reaching end of list
 * @param renderItem used for item rendering
 * @returns component
 */
const List = <T extends ListItem>({
  items,
  loading,
  showMore = false,
  showEmpty = false,
  error,
  onSearchMore,
  renderItem,
}: ListProps<T>) => {

  const renderEmpty = useCallback(() => {
    if (loading || error || items.length > 0 || !showEmpty) {
      return null;
    }
    return <Text style={styles.emptyResultText}>No Result</Text>;
  }, [loading, error, items, showEmpty]);

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
    return renderItem(item);
  }, [renderItem]);

  return (
    <View style={styles.container}>
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
