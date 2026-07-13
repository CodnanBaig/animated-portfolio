"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import { ArrowUpRight, GitForkIcon, GithubIcon, StarIcon } from "./icons";

type Repo = {
  id: number;
  name: string;
  url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
};

type GithubData = {
  profile: {
    login: string;
    url: string;
    publicRepos: number;
    followers: number;
    bio: string | null;
  };
  repos: Repo[];
  source: "github" | "fallback";
};

export function GithubFeed() {
  const [data, setData] = useState<GithubData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/github")
      .then((response) => {
        if (!response.ok) throw new Error("GitHub request failed");
        return response.json() as Promise<GithubData>;
      })
      .then((result) => active && setData(result))
      .catch(() => active && setFailed(true));
    return () => { active = false; };
  }, []);

  return (
    <div className="github-shell">
      <div className="github-profile-card reveal">
        <div className="github-mark"><GithubIcon size={28}/></div>
        <div>
          <span className="micro-label">Live code trail</span>
          <h3>@{data?.profile.login || profile.githubUsername}</h3>
          <p>{data?.profile.bio || "Full-stack product engineering across web, mobile, AI and music-tech."}</p>
        </div>
        <div className="github-stats">
          <div><strong>{data?.profile.publicRepos ?? "—"}</strong><span>public repos</span></div>
          <div><strong>{data?.profile.followers ?? "—"}</strong><span>followers</span></div>
        </div>
        <a className="text-link" href={data?.profile.url || profile.social.github} target="_blank" rel="noreferrer">
          View GitHub <ArrowUpRight size={17}/>
        </a>
      </div>

      <div className="repo-grid">
        {!data && !failed && Array.from({ length: 4 }).map((_, index) => (
          <div className="repo-card repo-skeleton" key={index}><i/><i/><i/></div>
        ))}
        {data?.repos.slice(0, 4).map((repo) => (
          <a className="repo-card reveal" href={repo.url} target="_blank" rel="noreferrer" key={repo.id}>
            <div className="repo-card-top">
              <span>{repo.language || "Repository"}</span>
              <ArrowUpRight size={17}/>
            </div>
            <h4>{repo.name.replaceAll("-", " ")}</h4>
            <p>{repo.description || "A public repository from Adnan's ongoing development work."}</p>
            <div className="repo-meta">
              <span><StarIcon/> {repo.stars}</span>
              <span><GitForkIcon/> {repo.forks}</span>
              <span>{new Date(repo.updatedAt).getFullYear()}</span>
            </div>
          </a>
        ))}
        {(failed || (data && data.repos.length === 0)) && (
          <a className="repo-card repo-fallback reveal" href={profile.social.github} target="_blank" rel="noreferrer">
            <div className="repo-card-top"><span>GitHub profile</span><ArrowUpRight size={17}/></div>
            <h4>Explore the code</h4>
            <p>The live repository feed is unavailable right now. The complete public profile remains one click away.</p>
          </a>
        )}
      </div>
    </div>
  );
}
