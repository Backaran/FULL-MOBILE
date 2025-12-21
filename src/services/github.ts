const githubBaseUrl: string = 'https://api.github.com';

export type GithubApiUser = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

export type GithubApiSearchUserResponse = {
  incomplete_results: boolean;
  items: GithubApiUser[];
  total_count: number;
};

let githubSearchUsersAbortController: AbortController | null = null;

/**
 * Use to search a github users
 * @param search terme to search
 * @param page page to retreive
 * @param resultPerPage result per page
 * @returns github search user response
 */
export const githubSearchUsers = async (
  search: string,
  page: number,
  resultPerPage: number,
): Promise<GithubApiSearchUserResponse | null> => {
  let result: GithubApiSearchUserResponse | null = null;

  if (githubSearchUsersAbortController) {
    githubSearchUsersAbortController.abort();
  }
  githubSearchUsersAbortController = new AbortController();

  if (!search.trim()) {
    return result;
  }

  try {
    const url: string = `${githubBaseUrl}/search/users?q=${encodeURIComponent(search)}&page=${page}&per_page=${resultPerPage}`;
    const response: Response = await fetch(url, {
      signal: githubSearchUsersAbortController.signal,
    });

    if (!response.ok) {
      throw new Error('GitHub API error');
    }

    result = await response.json();
  } catch (error: any) {
    if (error.name !== 'AbortError') {
      throw error;
    }
  } finally {
    githubSearchUsersAbortController = null;
  }

  return result;
};
