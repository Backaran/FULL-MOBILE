import { Dispatch } from 'react';
import * as GithubService from '../../services/github';
import { githubSearchUsersError, githubSearchUsersStart, githubSearchUsersStop } from './actions';
import { GithubUser } from './reducer';
import { Action } from '../store';
import { delay } from '../../utils/delay';

let currentSearch: string | null = null;

export const githubSearchUsers = async (
  dispatch: Dispatch<Action>,
  search: string,
  page: number = 1,
  resultsPerPage: number = 3
) => {

  // debounce thunk
  currentSearch = search;
  await delay(500);
  if (currentSearch !== search) {
    return;
  }

  dispatch(githubSearchUsersStart(search, page));
  try {
    const response: GithubService.GithubApiSearchUserResponse | null = await GithubService.githubSearchUsers(search, page, resultsPerPage);
    const responseItems: GithubService.GithubApiUser[] = (response?.items || []);
    const items: GithubUser[] = responseItems.map(x => ({ ...x, id: x.id.toString(), originalId: x.id }));
    dispatch(githubSearchUsersStop(items, response?.total_count || 0, resultsPerPage));
  } catch (e) {
    dispatch(githubSearchUsersError(e as Error));
  }
};
