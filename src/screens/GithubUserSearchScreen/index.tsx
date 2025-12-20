import { useCallback, useRef } from 'react';
import { deleteGithubUsers, duplicateGithubUsers, fetchGithubUsers } from '../../store/Github/thunks';
import useStore from '../../hooks/useStore';
import BaseScreen from '../BaseScreen';
import SearchInput, { SearchInputRefProps } from '../../components/Inputs/SearchInput';
import SearchResult, { SearchResultRefProps, SelectionState } from '../../components/SearchResult';
import GithubResultCard from '../../business/GithubUserCard';
import { GithubUser } from '../../store/Github/reducer';

type GithubUserSearchScreenProps = {
  editMode?: boolean;
};

const GithubUserSearchScreen = ({
  editMode = true
}: GithubUserSearchScreenProps) => {

  const { dispatch, state } = useStore();
  const _searchInputRef = useRef<SearchInputRefProps>(null);
  const _searchResultRef = useRef<SearchResultRefProps>(null);

  const onSearch = useCallback((search: string) => {
    _searchResultRef.current?.resetSelection();
    fetchGithubUsers(dispatch, search);
  }, [dispatch]);

  const onSearchMore = useCallback((page: number) => {
    const search: string = _searchInputRef.current?.getSearch() || '';
    fetchGithubUsers(dispatch, search, page);
  }, [dispatch]);

  const onDuplicateItems = useCallback((itemsToDuplicate: GithubUser[]) => {
    duplicateGithubUsers(dispatch, itemsToDuplicate.map(x => x.id));
  }, [dispatch]);

  const onDeleteItems = useCallback((itemsToDelete: GithubUser[]) => {
    const idsToDelete: string[] = itemsToDelete.map(x => x.id);
    _searchResultRef.current?.resetSelection(idsToDelete);
    deleteGithubUsers(dispatch, idsToDelete);
  }, [dispatch]);

  const renderItem = useCallback((
    item: GithubUser,
    _editMode: boolean,
    selected: boolean,
    onSelectionChanged: (id: string | number, state: SelectionState) => void,
  ) => (
    <GithubResultCard
      data={item}
      selected={selected}
      editMode={_editMode}
      onPress={() => onSelectionChanged(item.id, selected ? SelectionState.NotSelected : SelectionState.Selected)}
    />
  ), []);

  return (
    <BaseScreen title="Github Search">
      <SearchInput ref={_searchInputRef} onSearch={onSearch} />
      <SearchResult<GithubUser>
        ref={_searchResultRef}
        items={state.github.users.search.length > 0 ? state.github.users.data : undefined}
        currentPage={state.github.users.currentPage}
        maxPage={state.github.users.maxPage}
        loading={state.github.users.loading}
        editMode={editMode}
        onSearchMore={onSearchMore}
        onDuplicateItems={onDuplicateItems}
        onDeleteItems={onDeleteItems}
        renderItem={renderItem}
      />
    </BaseScreen>
  );
};

export default GithubUserSearchScreen;
