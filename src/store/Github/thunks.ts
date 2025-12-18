import { Dispatch } from "react";
import * as githubService from "../../services/github";
import { Constants } from "./constants";
import { GithubSearchErrorAction, GithubSearchStartAction, GithubSearchStopAction } from "./actions";

export const fetchGithubUsers = async (
  dispatch: Dispatch<{ type: string }>,
  search: string,
  page?: number
) => {
  const _page: number = page || 1;
  const startAction: GithubSearchStartAction = { type: Constants.GITHUB_SEARCH_START, payload: { search, page: _page } };
  dispatch(startAction);
  try {
    const data = await githubService.searchUsers(search, _page);
    const stopAction: GithubSearchStopAction = { type: Constants.GITHUB_SEARCH_STOP, payload: { data } };
    dispatch(stopAction);
  } catch (e) {
    const errorAction: GithubSearchErrorAction = { type: Constants.GITHUB_SEARCH_ERROR, payload: { error: e as Error } };
    dispatch(errorAction);
  }
}
