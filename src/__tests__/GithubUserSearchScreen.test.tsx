import { render, fireEvent } from '@testing-library/react-native';
import GithubUserSearchScreen from '../screens/GithubUserSearchScreen';
import { githubSearchUsers } from '../store/Github/thunks';
import { githubDeleteUsers, githubDuplicateUsers } from '../store/Github/actions';
import useStore from '../hooks/useStore';

// ========================= Mocks

jest.mock('../hooks/useStore');

jest.mock('../store/Github/thunks', () => ({
  githubSearchUsers: jest.fn(),
}));

jest.mock('../store/Github/actions', () => ({
  githubDeleteUsers: jest.fn((ids) => ({ type: 'DELETE', payload: ids })),
  githubDuplicateUsers: jest.fn((ids) => ({ type: 'DUPLICATE', payload: ids })),
}));

jest.mock('../components/List', () => {
  const React = require('react');
  const { Button } = require('react-native');
  return ({ onSearchMore, onDuplicate, onDelete }: any) => (
    <>
      <Button title="" testID="search-more" onPress={onSearchMore} />
      <Button title="" testID="duplicate" onPress={() => onDuplicate(['1'])} />
      <Button title="" testID="delete" onPress={() => onDelete(['1'])} />
    </>
  );
});

jest.mock('../components/Inputs/TextInput', () => {
  const React = require('react');
  const { Button } = require('react-native');
  return ({ onChanged }: any) => (
    <Button title="" testID="search-input" onPress={() => onChanged('john')} />
  );
});

jest.mock('../screens/BaseScreen', () => {
  return ({ children }: any) => <>{children}</>;
});

// ========================= Helpers

const mockDispatch = jest.fn();

const mockState = {
  github: {
    users: {
      data: [],
      search: 'john',
      currentPage: 1,
      maxPage: 2,
      total: 0,
      loading: false,
    },
  },
};

(useStore as jest.Mock).mockReturnValue({
  dispatch: mockDispatch,
  state: mockState,
});

// ========================= Tests

describe('GithubUserSearchScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<GithubUserSearchScreen />);
    expect(getByTestId('search-input')).toBeTruthy();
  });

  it('calls githubSearchUsers on search', () => {
    const { getByTestId } = render(<GithubUserSearchScreen resultsPerPage={5} />);

    fireEvent.press(getByTestId('search-input'));

    expect(githubSearchUsers).toHaveBeenCalledWith(
      mockDispatch,
      'john',
      1,
      5
    );
  });

  it('loads more users when search more is triggered', () => {
    const { getByTestId } = render(<GithubUserSearchScreen />);

    fireEvent.press(getByTestId('search-more'));

    expect(githubSearchUsers).toHaveBeenCalledWith(
      mockDispatch,
      'john',
      2
    );
  });

  it('dispatches duplicate action', () => {
    const { getByTestId } = render(<GithubUserSearchScreen />);

    fireEvent.press(getByTestId('duplicate'));

    expect(mockDispatch).toHaveBeenCalledWith(
      githubDuplicateUsers(['1'])
    );
  });

  it('dispatches delete action', () => {
    const { getByTestId } = render(<GithubUserSearchScreen />);

    fireEvent.press(getByTestId('delete'));

    expect(mockDispatch).toHaveBeenCalledWith(
      githubDeleteUsers(['1'])
    );
  });
});
