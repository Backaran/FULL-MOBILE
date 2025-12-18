import { GithubUser } from "../../services/github";
import { GithubSearchErrorAction, GithubSearchStartAction, GithubSearchStopAction } from "./actions";
import { Constants } from "./constants";

export interface State {
  users: {
    search: string,
    data: GithubUser[];
    page: number;
    loading: boolean;
    error?: Error;
  },
}

export const initialState: State = {
  users: {
    search: '',
    data: [],
    page: 1,
    loading: false,
  }
}

export const reducer = (state: State, action: { type: string }): State => {
  switch (action.type) {
    case Constants.GITHUB_SEARCH_START: {
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
        }
      };
    }
    case Constants.GITHUB_SEARCH_STOP: {
      const customAction = action as GithubSearchStopAction;
      return {
        ...state,
        users: {
          ...state.users,
          loading: false,
          error: undefined,
          data: [...state.users.data, ...customAction.payload.data],
        }
      };
    }
    case Constants.GITHUB_SEARCH_ERROR: {
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