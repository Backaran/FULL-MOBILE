const GITHUB_BASE_URL: string = 'https://api.github.com';

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

/**
 * Use to search a github users
 * @param search terme to search
 * @param page page to retreive
 * @param resultPerPage result per page
 * @returns github search user response
 */
export const githubSearchUsers = async (
  search: string,
  page: number = 1,
  resultPerPage: number = 30,
  signal?: AbortSignal,
): Promise<GithubApiSearchUserResponse | null> => {
  try {
    if (!search || page < 1 || resultPerPage < 1 || resultPerPage > 100) {
      throw new Error(String(-1));
    }

    const url: string = `${GITHUB_BASE_URL}/search/users?q=${encodeURIComponent(search)}&page=${page}&per_page=${resultPerPage}`;
    const response: Response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(String(response.status));
    }

    return await response.json() as GithubApiSearchUserResponse;
  }
  catch (e: any) {
    if (e.name === 'AbortError') {
      throw new Error('AbortError');
    }
    throw e;
  }
};
