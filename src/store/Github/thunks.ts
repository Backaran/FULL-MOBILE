import { Dispatch } from 'react';
import * as GithubService from '../../services/github';
import { githubSearchUsersError, githubSearchUsersStart, githubSearchUsersStop } from './actions';
import { GithubSearchUserErrors, GithubUser } from './reducer';
import { Action } from '../store';

let githubSearchUsersAbortController: AbortController | null = null;

export const githubSearchUsers = async (
  dispatch: Dispatch<Action>,
  search: string,
  page: number = 1,
  resultsPerPage: number = 3
) => {
  githubSearchUsersAbortController?.abort();
  githubSearchUsersAbortController = new AbortController();
  dispatch(githubSearchUsersStart(search, page));
  try {
    const response: GithubService.GithubApiSearchUserResponse | null = await GithubService.githubSearchUsers(
      search,
      page,
      resultsPerPage,
      githubSearchUsersAbortController.signal
    );
    const responseItems: GithubService.GithubApiUser[] = (response?.items || []);
    const items: GithubUser[] = responseItems.map(x => ({ ...x, id: x.id.toString(), originalId: x.id }));
    dispatch(githubSearchUsersStop(items, response?.total_count || 0, resultsPerPage));
  } catch (e: any) {
    const error: Error = e as Error;
    if (error.message !== 'AbortError') {
      let customError: GithubSearchUserErrors = GithubSearchUserErrors.Unknown;
      switch (error.message) {
        case '-1':
          customError = GithubSearchUserErrors.InvalidSearch;
          break;
        case '422':
          customError = GithubSearchUserErrors.Spam;
          break;
        case '503':
          customError = GithubSearchUserErrors.Unavailable;
          break;
      }
      dispatch(githubSearchUsersError(customError));
    }
  }
};
