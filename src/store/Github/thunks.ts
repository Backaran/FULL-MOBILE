import { Dispatch } from 'react';
import * as GithubService from '../../services/github';
import { githubSearchUsersError, githubSearchUsersStart, githubSearchUsersStop } from './actions';
import { GithubSearchUserErrors, GithubUser } from './reducer';
import { Action, ThunkAction } from '../store';

const githubSearchUsersAction: ThunkAction = new ThunkAction();

export const githubSearchUsers = async (
  dispatch: Dispatch<Action>,
  search: string,
  page: number = 1,
  resultsPerPage: number = 3
) => {
  const key: number = githubSearchUsersAction.start();
  try {
    dispatch(githubSearchUsersStart(search, page));
    const response: GithubService.GithubApiSearchUserResponse | null = await GithubService.githubSearchUsers(
      search,
      page,
      resultsPerPage,
      githubSearchUsersAction.getSignal()
    );
    const responseItems: GithubService.GithubApiUser[] = (response?.items || []);
    const items: GithubUser[] = responseItems.map(x => ({ ...x, id: x.id.toString(), originalId: x.id }));
    if (!githubSearchUsersAction.isCanceled(key)) {
      dispatch(githubSearchUsersStop(items, response?.total_count || 0, resultsPerPage));
    }
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
      if (!githubSearchUsersAction.isCanceled(key)) {
        dispatch(githubSearchUsersError(customError));
      }
    }
  }
};
