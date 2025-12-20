import { GithubState, githubInitialState, githubReducer } from './Github/reducer';
import { githubPrefix } from './Github/constants';

export interface AppState {
  github: GithubState;
}

export const initialState: AppState = {
  github: githubInitialState,
};

export const reducer = (state: AppState, action: { type: string }): AppState => {
  if (action.type.startsWith(githubPrefix)) {
    return { ...state, github: githubReducer(state.github, action) };
  }
  throw new Error(`Unknown action: ${action.type}`);
};
