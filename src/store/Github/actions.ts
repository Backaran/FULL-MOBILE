import { GithubConstants } from './constants';
import { GithubSearchUserErrors, GithubUser } from './reducer';

// ==================== SEARCH

export type GithubSearchUsersStartAction = {
  type: GithubConstants.GITHUB_SEARCH_USERS_START;
  payload: { search: string; page: number };
};
export const githubSearchUsersStart = (search: string, page: number): GithubSearchUsersStartAction => ({
  type: GithubConstants.GITHUB_SEARCH_USERS_START,
  payload: { search, page },
});

export type GithubSearchUsersStopAction = {
  type: GithubConstants.GITHUB_SEARCH_USERS_STOP;
  payload: { data: GithubUser[]; total: number; resultsPerPage: number };
};
export const githubSearchUsersStop = (data: GithubUser[], total: number, resultsPerPage: number): GithubSearchUsersStopAction => ({
  type: GithubConstants.GITHUB_SEARCH_USERS_STOP,
  payload: { data, total, resultsPerPage },
});

export type GithubSearchUsersErrorAction = {
  type: GithubConstants.GITHUB_SEARCH_USERS_ERROR;
  payload: { error: GithubSearchUserErrors };
};
export const githubSearchUsersError = (error: GithubSearchUserErrors): GithubSearchUsersErrorAction => ({
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