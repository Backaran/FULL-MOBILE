
export type GithubUser = {
  id: string;
  login: string;
  avatar_url: string;
  html_url: string;
}

type GitHubSearchResponse = {
  items: GithubUser[];
};

export const searchUsers = async (search: string, signal: AbortSignal): Promise<GithubUser[]> => {
  if (!search.trim()) {
    return [];
  }

  const url: string = `https://api.github.com/search/users?q=${encodeURIComponent(search)}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error('GitHub API error');
  }

  const data: GitHubSearchResponse = await response.json();
  return data.items;
};