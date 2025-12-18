export type GithubUser = {
  id: string;
  login: string;
  avatar_url: string;
  html_url: string;
}

type GitHubSearchResponse = {
  items: GithubUser[];
}

let searchUsersAbortController: AbortController | null = null;
export const searchUsers = async (search: string, page: number = 1): Promise<GithubUser[]> => {
  let result: GithubUser[] = [];

  if (searchUsersAbortController) {
    searchUsersAbortController.abort();
  }
  searchUsersAbortController = new AbortController();

  if (!search.trim()) {
    return result;
  }

  try {

    const url: string = `https://api.github.com/search/users?q=${encodeURIComponent(search)}&page=${page}&per_page=100`;
    const response = await fetch(url, { signal: searchUsersAbortController.signal });

    if (!response.ok) {
      throw new Error('GitHub API error');
    }

    const data: GitHubSearchResponse = await response.json();

    result = data.items;

  } catch (error: any) {

    if (error.name !== 'AbortError') {
      throw error;
    }

  } finally {
    searchUsersAbortController = null;
  }

  return result;
}
