"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { Project } from "@/data/portfolio";
import { profile } from "@/data/portfolio";
import { ArrowLeft, ArrowRight, ArrowUpRight, GithubIcon, LinkedinIcon } from "./icons";
import { ProjectVisual } from "./project-visual";

export function CaseStudyShell({ project, nextProject }: { project: Project; nextProject: Project }) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="case-shell">
      <header className="case-header">
        <Link href="/" className="brand"><span>AB</span><i/></Link>
        <Link className="case-back" href="/#work"><ArrowLeft/> All work</Link>
        <a className="header-cta" href={profile.social.email}>Start a conversation <ArrowUpRight size={16}/></a>
      </header>
      <main>
        <section className="case-hero section-pad">
          <div className="case-hero-top reveal"><span>{project.number}</span><span>{project.eyebrow}</span><span>{project.year}</span></div>
          <h1 className="reveal">{project.title}</h1>
          <p className="case-summary reveal">{project.summary}</p>
          <div className="case-visual reveal"><ProjectVisual type={project.visual}/></div>
        </section>

        <section className="case-overview section-pad">
          <div className="case-overview-label reveal"><span>Context</span><span>01 / 04</span></div>
          <div className="case-overview-copy reveal"><p>{project.description}</p></div>
          <div className="case-stack reveal">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
        </section>

        <section className="case-narrative section-pad">
          <article className="reveal"><span>01</span><small>The challenge</small><h2>{project.challenge}</h2></article>
          <article className="reveal"><span>02</span><small>The approach</small><h2>{project.approach}</h2></article>
          <article className="reveal"><span>03</span><small>The outcome</small><h2>{project.outcome}</h2></article>
        </section>

        <section className="case-impact section-pad">
          <div className="section-index reveal"><span>04</span><span>What the work covered</span></div>
          <div className="impact-grid">
            {project.impact.map((item, index) => <div className="impact-card reveal" key={item}><span>0{index + 1}</span><p>{item}</p></div>)}
          </div>
        </section>

        <section className="next-project section-pad">
          <span className="micro-label reveal">Next case study</span>
          <Link href={`/work/${nextProject.slug}`} className="next-link reveal">
            <span>{nextProject.number}</span><h2>{nextProject.title}</h2><ArrowRight size={42}/>
          </Link>
        </section>
      </main>
      <footer className="case-footer section-pad">
        <span>Adnan Baig · Full Stack Product Engineer</span>
        <div><a href={profile.social.github} target="_blank" rel="noreferrer"><GithubIcon/> GitHub</a><a href={profile.social.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon/> LinkedIn</a></div>
      </footer>
    </div>
  );
}
