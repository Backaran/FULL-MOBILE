import { GithubConstants } from './constants';
import { GithubUser } from './reducer';

// ==================== SEARCH

export type GithubSearchUsersStartAction = {
  type: GithubConstants.GITHUB_SEARCH_USERS_START;
  payload: { search: string; page: number };
};
export const githubSearchStart = (search: string, page: number): GithubSearchUsersStartAction => ({
  type: GithubConstants.GITHUB_SEARCH_USERS_START,
  payload: { search, page },
});

export type GithubSearchUsersStopAction = {
  type: GithubConstants.GITHUB_SEARCH_USERS_STOP;
  payload: { data: GithubUser[]; total: number };
};
export const githubSearchStop = (data: GithubUser[], total: number): GithubSearchUsersStopAction => ({
  type: GithubConstants.GITHUB_SEARCH_USERS_STOP,
  payload: { data, total },
});

export type GithubSearchUsersErrorAction = {
  type: GithubConstants.GITHUB_SEARCH_USERS_ERROR;
  payload: { error: Error };
};
export const githubSearchError = (error: Error): GithubSearchUsersErrorAction => ({
  type: GithubConstants.GITHUB_SEARCH_USERS_ERROR,
  payload: { error },
});

// ==================== DUPLICATE

export type GithubDuplicateUsersAction = {
  type: GithubConstants.GITHUB_DUPLICATE_USERS;
  payload: { ids: string[] };
};
export const githubDuplicateUsers = (ids: string[]): GithubDuplicateUsersAction => ({
  type: GithubConstants.GITHUB_DUPLICATE_USERS,
  payload: { ids },
});

// ==================== DELETE

export type GithubDeleteUsersAction = {
  type: GithubConstants.GITHUB_DELETE_USERS;
  payload: { ids: string[] };
};
export const githubDeleteUsers = (ids: string[]): GithubDeleteUsersAction => ({
  type: GithubConstants.GITHUB_DELETE_USERS,
  payload: { ids },
});