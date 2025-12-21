import { useCallback, useState } from 'react';
import { githubSearchUsers } from '../../store/Github/thunks';
import useStore from '../../hooks/useStore';
import BaseScreen from '../BaseScreen';
import List, { SelectionState } from '../../components/List';
import GithubUserCard from '../../business/GithubUserCard';
import { GithubSearchUserErrors, GithubUser } from '../../store/Github/reducer';
import { githubDeleteUsers, githubDuplicateUsers } from '../../store/Github/actions';
import TextInput from '../../components/Inputs/TextInput';

interface GithubUserSearchScreenProps {
  /** if user can be duplicated/deleted */
  editMode?: boolean;
  /** results per page */
  resultsPerPage?: number;
};

/**
 * Screen used to search and display github users
 * @param editMode if user can be duplicated/deleted (default: true)
 * @returns component
 */
const GithubUserSearchScreen = ({
  editMode = true,
  resultsPerPage = 3,
}: GithubUserSearchScreenProps) => {
  const { dispatch, state } = useStore();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onSearch = useCallback((search: string) => {
    setSelectedIds([]);
    githubSearchUsers(dispatch, search, 1, resultsPerPage);
  }, [dispatch, resultsPerPage]);

  const onSearchMore = useCallback(() => {
    githubSearchUsers(dispatch, state.github.users.search, state.github.users.currentPage + 1);
  }, [dispatch, state.github.users.search, state.github.users.currentPage]);

  const onSelectionChange = useCallback((ids: (string | number)[]) => {
    setSelectedIds(ids as string[]);
  }, []);

  const onDuplicate = useCallback((ids: (string | number)[]) => {
    dispatch(githubDuplicateUsers(ids as string[]));
  }, [dispatch]);

  const onDelete = useCallback((ids: (string | number)[]) => {
    setSelectedIds((p) => p.filter(s => !ids.includes(s)));
    dispatch(githubDeleteUsers(ids as string[]))
  }, [dispatch]);

  const renderItem = useCallback((
    item: GithubUser,
    _editMode: boolean,
    selected: boolean,
    onSelectionChanged: (id: string | number, state: SelectionState) => void,
  ) => (
    <GithubUserCard
      data={item}
      selected={selected}
      editMode={_editMode}
      onToggle={() => onSelectionChanged(item.id, selected ? SelectionState.NotSelected : SelectionState.Selected)}
    />
  ), []);

  const renderErrorMessage = useCallback(() => {
    switch (state.github.users.error) {
      case GithubSearchUserErrors.Unknown:
        return 'Unknown Error';
      case GithubSearchUserErrors.InvalidSearch:
        return 'Invalid Search Error';
      case GithubSearchUserErrors.Spam:
        return 'Spam Error';
      case GithubSearchUserErrors.Unavailable:
        return 'Unavailable Error';
    }
    return undefined;
  }, [state.github.users.error]);

  return (
    <BaseScreen title="Github Search">
      <TextInput
        placeholder='Search Input'
        onChange={onSearch}
        debouceDelayInMs={500}
      />
      <List<GithubUser>
        items={state.github.users.data}
        selectedIds={selectedIds}
        showMore={state.github.users.currentPage !== state.github.users.maxPage}
        showEmpty={!state.github.users.error && state.github.users.total === 0 && state.github.users.search.length > 0}
        loading={state.github.users.loading}
        error={renderErrorMessage()}
        editMode={editMode}
        onSelectionChange={onSelectionChange}
        onSearchMore={onSearchMore}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
        renderItem={renderItem}
      />
    </BaseScreen>
  );
};

export default GithubUserSearchScreen;
