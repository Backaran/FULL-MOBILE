import Screen from '../../components/Screen';
import SearchInput, { SearchInputRefProps } from '../../components/SearchInput';
import SearchResult from '../../components/SearchResult';
import { GithubUser } from '../../services/github';
import GithubResultCard from '../../components/GithubUserCard';
import { useCallback, useRef } from 'react';
import { useStore } from '../../hooks/useStore';
import { fetchGithubUsers } from '../../store/Github/thunks';

const GithubUserSearchScreen = () => {
  const editMode = false;
  const { dispatch, state } = useStore();
  const _searchInputRef = useRef<SearchInputRefProps>(null);

  const onSearch = useCallback((search: string) => {
    fetchGithubUsers(dispatch, search);
  }, [dispatch]);

  const onSearchMore = useCallback((page: number) => {
    const search = _searchInputRef.current?.getSearch();
    fetchGithubUsers(dispatch, search || '', page);
  }, [dispatch]);

  return (
    <Screen title="Github Search">
      <SearchInput
        ref={_searchInputRef}
        onSearch={onSearch}
      />
      <SearchResult<GithubUser>
        items={state.github.users.data}
        lastPage={state.github.users.page}
        loading={state.github.users.loading}
        editMode={editMode}
        onSearchMore={onSearchMore}
        renderItem={(d: GithubUser) => <GithubResultCard data={d} editMode={editMode} />}
      />
    </Screen>
  );
}

export default GithubUserSearchScreen;
