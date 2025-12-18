import Screen from '../../components/Screen';
import SearchInput from '../../components/SearchInput';
import SearchResult from '../../components/SearchResult';
import { GithubUser, searchUsers } from '../../services/github';
import GithubResultCard from '../../components/GithubUserCard';
import { useState } from 'react';

const GithubSearchScreen = () => {
  const editMode = false;
  const [items, setItems] = useState<GithubUser[]>([]);

  return (
    <Screen title="Github Search">
      <SearchInput<GithubUser>
        onSearchStart={searchUsers}
        onSearchEnd={(result) => setItems(result || [])}
      />
      <SearchResult<GithubUser>
        items={items}
        editMode={editMode}
        renderItem={(d: GithubUser) => <GithubResultCard data={d} editMode={editMode} />}
      />
    </Screen>
  );
}

export default GithubSearchScreen;