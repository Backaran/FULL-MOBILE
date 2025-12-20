import { GithubUser } from '../../services/github';
import { GithubConstants } from './constants';

export type GithubSearchStartAction = {
  type: GithubConstants.GITHUB_SEARCH_START;
  payload: { search: string; page: number };
};
export const githubSearchStart = (search: string, page: number): GithubSearchStartAction => ({
  type: GithubConstants.GITHUB_SEARCH_START,
  payload: { search, page },
});

export type GithubSearchStopAction = {
  type: GithubConstants.GITHUB_SEARCH_STOP;
  payload: { data: GithubUser[]; total: number };
};
export const githubSearchStop = (data: GithubUser[], total: number): GithubSearchStopAction => ({
  type: GithubConstants.GITHUB_SEARCH_STOP,
  payload: { data, total },
});

export type GithubSearchErrorAction = {
  type: GithubConstants.GITHUB_SEARCH_ERROR;
  payload: { error: Error };
};
export const githubSearchError = (error: Error): GithubSearchErrorAction => ({
  type: GithubConstants.GITHUB_SEARCH_ERROR,
  payload: { error },
});
