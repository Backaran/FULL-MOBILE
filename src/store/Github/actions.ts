import { GithubUser } from "../../services/github";
import { Constants } from "./constants";

export type GithubSearchStartAction = { type: Constants.GITHUB_SEARCH_START; payload: { search: string, page: number } };
export const githubSearchStart = (search: string, page: number): GithubSearchStartAction =>
    ({ type: Constants.GITHUB_SEARCH_START, payload: { search, page } });

export type GithubSearchStopAction = { type: Constants.GITHUB_SEARCH_STOP; payload: { data: GithubUser[] } };
export const githubSearchStop = (data: GithubUser[]): GithubSearchStopAction =>
    ({ type: Constants.GITHUB_SEARCH_STOP, payload: { data } });

export type GithubSearchErrorAction = { type: Constants.GITHUB_SEARCH_ERROR; payload: { error: Error } };
export const githubSearchError = (error: Error): GithubSearchErrorAction =>
    ({ type: Constants.GITHUB_SEARCH_ERROR, payload: { error } });
