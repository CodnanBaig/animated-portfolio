import { NextResponse } from "next/server";
import { profile } from "@/data/portfolio";

type GitHubProfile = {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  bio: string | null;
};

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  updated_at: string;
  homepage: string | null;
};

const fallback = {
  profile: {
    login: profile.githubUsername,
    avatarUrl: "",
    url: profile.social.github,
    publicRepos: 0,
    followers: 0,
    bio: "Full-stack product engineer building web, mobile and music-tech products.",
  },
  repos: [],
  source: "fallback",
};

export async function GET() {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "adnan-baig-portfolio",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [profileResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${profile.githubUsername}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${profile.githubUsername}/repos?per_page=100&sort=updated`,
        { headers, next: { revalidate: 3600 } },
      ),
    ]);

    if (!profileResponse.ok || !reposResponse.ok) {
      return NextResponse.json(fallback, { status: 200 });
    }

    const githubProfile = (await profileResponse.json()) as GitHubProfile;
    const githubRepos = (await reposResponse.json()) as GitHubRepo[];

    const repos = githubRepos
      .filter((repo) => !repo.fork && !repo.archived)
      .sort((a, b) => {
        const scoreA = a.stargazers_count * 4 + new Date(a.updated_at).getTime() / 1e12;
        const scoreB = b.stargazers_count * 4 + new Date(b.updated_at).getTime() / 1e12;
        return scoreB - scoreA;
      })
      .slice(0, 6)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        url: repo.html_url,
        homepage: repo.homepage,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
      }));

    return NextResponse.json({
      profile: {
        login: githubProfile.login,
        avatarUrl: githubProfile.avatar_url,
        url: githubProfile.html_url,
        publicRepos: githubProfile.public_repos,
        followers: githubProfile.followers,
        bio: githubProfile.bio,
      },
      repos,
      source: "github",
    });
  } catch {
    return NextResponse.json(fallback, { status: 200 });
  }
}
