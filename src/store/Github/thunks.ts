import { Dispatch } from 'react';
import { GithubApiSearchUserResponse, githubSearchUsers } from '../../services/github';
import { githubDeleteUsers, githubDuplicateUsers, githubSearchError, githubSearchStart, githubSearchStop } from './actions';
import { GithubUser } from './reducer';

export const fetchGithubUsers = async (
  dispatch: Dispatch<{ type: string }>,
  search: string,
  page?: number,
) => {
  const _page: number = page || 1;
  dispatch(githubSearchStart(search, _page));
  try {
    const response: GithubApiSearchUserResponse | null = await githubSearchUsers(search, _page);
    // store id as string in a new string prop for easy duplicate (keeping original in originalId)
    const items: GithubUser[] = (response?.items || []).map(x => ({ ...x, id: x.id.toString(), originalId: x.id }));
    dispatch(githubSearchStop(items, response?.total_count || 0));
  } catch (e) {
    dispatch(githubSearchError(e as Error));
  }
};

export const duplicateGithubUsers = async (
  dispatch: Dispatch<{ type: string }>,
  ids: string[],
) => {
  dispatch(githubDuplicateUsers(ids));
};

export const deleteGithubUsers = async (
  dispatch: Dispatch<{ type: string }>,
  ids: string[],
) => {
  dispatch(githubDeleteUsers(ids));
};