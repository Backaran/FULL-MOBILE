import { Action } from '../store';
import { GithubDeleteUsersAction, GithubDuplicateUsersAction, GithubSearchUsersErrorAction, GithubSearchUsersStartAction, GithubSearchUsersStopAction } from './actions';
import { GithubConstants } from './constants';

export type GithubUser = {
  id: string;
  originalId: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

export interface GithubState {
  users: {
    search: string;
    data: GithubUser[];
    currentPage: number;
    total: number;
    maxPage: number;
    loading: boolean;
    error?: Error;
  };
}

export const githubInitialState: GithubState = {
  users: {
    search: '',
    data: [],
    currentPage: 0,
    total: 0,
    maxPage: 0,
    loading: false,
  },
};

export const githubReducer = (state: GithubState, action: Action): GithubState => {
  switch (action.type) {
    case GithubConstants.GITHUB_SEARCH_USERS_START: {
      const customAction = action as GithubSearchUsersStartAction;
      const firstSearch: boolean = customAction.payload.page === 1;
      return {
        ...state,
        users: {
          ...state.users,
          search: customAction.payload.search,
          data: firstSearch ? githubInitialState.users.data : state.users.data,
          total: firstSearch ? githubInitialState.users.total : state.users.total,
          currentPage: customAction.payload.page,
          maxPage: firstSearch ? githubInitialState.users.maxPage : state.users.maxPage,
          loading: true,
          error: undefined,
        },
      };
    }
    case GithubConstants.GITHUB_SEARCH_USERS_STOP: {
      const customAction = action as GithubSearchUsersStopAction;
      return {
        ...state,
        users: {
          ...state.users,
          data: [...state.users.data, ...customAction.payload.data],
          total: customAction.payload.total,
          maxPage: Math.ceil(customAction.payload.total / 3) || 1,
          loading: false,
          error: undefined,
        },
      };
    }
    case GithubConstants.GITHUB_SEARCH_USERS_ERROR: {
      const customAction = action as GithubSearchUsersErrorAction;
      return {
        ...state,
        users: {
          ...state.users,
          loading: false,
          error: customAction.payload.error,
        },
      };
    }
    case GithubConstants.GITHUB_DUPLICATE_USERS: {
      const customAction = action as GithubDuplicateUsersAction;
      const duplicatedUsers: GithubUser[] = state.users.data
        .filter(d => customAction.payload.ids.includes(d.id))
        .map(x => ({ ...x, id: `${x.id}${Date.now()}` }));
      return {
        ...state,
        users: {
          ...state.users,
          data: [
            ...state.users.data,
            ...duplicatedUsers
          ]
        },
      };
    }
    case GithubConstants.GITHUB_DELETE_USERS: {
      const customAction = action as GithubDeleteUsersAction;
      return {
        ...state,
        users: {
          ...state.users,
          data: state.users.data.filter(x => !customAction.payload.ids.includes(x.id))
        },
      };
    }
    default:
      return state;
  }
};
