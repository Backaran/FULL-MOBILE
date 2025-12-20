import { Dispatch } from 'react';
import { GithubUserSearchResponse, searchGithubUsers } from '../../services/github';
import { githubSearchError, githubSearchStart, githubSearchStop } from './actions';

export const fetchGithubUsers = async (
  dispatch: Dispatch<{ type: string }>,
  search: string,
  page?: number,
) => {
  const _page: number = page || 1;
  dispatch(githubSearchStart(search, _page));
  try {
    const response: GithubUserSearchResponse | null = await searchGithubUsers(search, _page);
    dispatch(githubSearchStop(response?.items || [], response?.total_count || 0));
  } catch (e) {
    dispatch(githubSearchError(e as Error));
  }
};
