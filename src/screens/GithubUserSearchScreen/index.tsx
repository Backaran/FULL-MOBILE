import { useCallback, useRef } from 'react';
import { useStore } from '../../hooks/useStore';
import BaseScreen from '../BaseScreen';
import { GithubUser } from '../../services/github';
import { fetchGithubUsers } from '../../store/Github/thunks';
import SearchInput, { SearchInputRefProps } from '../../components/Inputs/SearchInput';
import SearchResult, { SelectionState } from '../../components/SearchResult';
import GithubResultCard from '../../business/GithubUserCard';

type GithubUserSearchScreenProps = {
  editMode?: boolean;
};

const GithubUserSearchScreen = ({ editMode = true }: GithubUserSearchScreenProps) => {
  const { dispatch, state } = useStore();
  const _searchInputRef = useRef<SearchInputRefProps>(null);

  const onSearch = useCallback(
    (search: string) => {
      fetchGithubUsers(dispatch, search);
    },
    [dispatch],
  );

  const onSearchMore = useCallback(
    (page: number) => {
      const search: string = _searchInputRef.current?.getSearch() || '';
      fetchGithubUsers(dispatch, search, page);
    },
    [dispatch],
  );

  return (
    <BaseScreen title="Github Search">
      <SearchInput ref={_searchInputRef} onSearch={onSearch} />
      <SearchResult<GithubUser>
        items={state.github.users.search.length > 0 ? state.github.users.data : undefined}
        total={state.github.users.total}
        currentPage={state.github.users.page}
        loading={state.github.users.loading}
        editMode={editMode}
        onSearchMore={onSearchMore}
        renderItem={(
          item: GithubUser,
          _editMode: boolean,
          selected: boolean,
          onSelectionChanged?: (id: string | number, state: SelectionState) => void,
        ) => (
          <GithubResultCard
            data={item}
            selected={selected}
            editMode={_editMode}
            onPress={() =>
              onSelectionChanged &&
              onSelectionChanged(
                item.id,
                selected ? SelectionState.NotSelected : SelectionState.Selected,
              )
            }
          />
        )}
      />
    </BaseScreen>
  );
};

export default GithubUserSearchScreen;
