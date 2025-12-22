import { GithubState, githubInitialState, githubReducer } from './Github/reducer';
import { githubPrefix } from './Github/constants';

/**
 * Data of app
 */
export interface AppState {
  github: GithubState;
}

/**
 * Initial data state of app
 */
export const appInitialState: AppState = {
  github: githubInitialState,
};

/**
 * Action to be executed against app state
 */
export interface Action {
  type: string;
}

/** Action used to control thunk cancelation */
export class ThunkAction {
  private key?: number;
  private controller?: AbortController;

  start = (): number => {
    this.controller?.abort();
    this.key = Date.now();
    this.controller = new AbortController();
    return this.key;
  };

  isCanceled = (key: number): boolean => {
    return key !== this.key;
  };

  getSignal = (): (AbortSignal | undefined) => {
    return this.controller?.signal;
  }
}

/**
 * App general reducer used to alter app state with an action,
 * redirect to specific reducer depending action type
 * @param state current state of app
 * @param action action to be executed against state state
 * @returns state modified after action
 */
export const appReducer = (state: AppState, action: Action): AppState => {
  if (action.type.startsWith(githubPrefix)) {
    return { ...state, github: githubReducer(state.github, action) };
  }
  throw new Error(`Unknown action: ${action.type}`);
};
