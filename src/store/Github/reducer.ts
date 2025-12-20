import { GithubUser } from "../../services/github";
import { GithubSearchErrorAction, GithubSearchStartAction, GithubSearchStopAction } from "./actions";
import { GithubConstants } from "./constants";

export interface GithubState {
  users: {
    search: string,
    data: GithubUser[];
    total: number;
    page: number;
    loading: boolean;
    error?: Error;
  },
}

export const githubInitialState: GithubState = {
  users: {
    search: '',
    data: [],
    total: 0,
    page: 1,
    loading: false,
  }
}

export const githubReducer = (state: GithubState, action: { type: string }): GithubState => {
  switch (action.type) {
    case GithubConstants.GITHUB_SEARCH_START: {
      const customAction = action as GithubSearchStartAction;
      return {
        ...state,
        users: {
          ...state.users,
          loading: true,
          error: undefined,
          search: customAction.payload.search,
          page: customAction.payload.page,
          data: customAction.payload.page === 1 ? [] : state.users.data,
          total: customAction.payload.page === 1 ? 0 : state.users.total,
        }
      };
    }
    case GithubConstants.GITHUB_SEARCH_STOP: {
      const customAction = action as GithubSearchStopAction;
      return {
        ...state,
        users: {
          ...state.users,
          loading: false,
          error: undefined,
          data: [...state.users.data, ...customAction.payload.data],
          total: customAction.payload.total,
        }
      };
    }
    case GithubConstants.GITHUB_SEARCH_ERROR: {
      const customAction = action as GithubSearchErrorAction;
      return {
        ...state,
        users: {
          ...state.users,
          loading: false,
          error: customAction.payload.error
        }
      };
    }
    default:
      return state;
  }
}
