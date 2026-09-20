import Link from "next/link";
import type { Project } from "@/data/portfolio";
import { SiteHeader, SiteFooter } from "./site-chrome";
import { ProjectVisual, ProjectLinks } from "./project-visual";
import { ArrowLeft, ArrowUpRight } from "./icons";

export function CaseStudyShell({
  project,
  nextProject,
}: {
  project: Project;
  nextProject: Project;
}) {
  return (
    <div id="top">
      <SiteHeader />
      <main id="main" className="case-page">
        <header className="case-header">
          <Link className="back-link" href="/#work">
            <ArrowLeft size={17} />
            Back to the collection
          </Link>
          <div className="case-title-row">
            <div>
              <span className="section-label">
                {project.category} · {project.year}
              </span>
              <h1>
                {project.title}
                <span className="copper-period">.</span>
              </h1>
            </div>
            <span className="case-number">
              {project.number}
              <span>/ 07</span>
            </span>
          </div>
          <div className="case-intro">
            <p>{project.summary}</p>
            <ProjectLinks project={project} />
          </div>
        </header>
        <div className={`case-stage project-${project.slug}`}>
          <ProjectVisual project={project} priority />
          {project.slug === "pitchgenie" && (
            <span className="case-image-note">
              Current workspace shown. The live link opens an earlier release.
            </span>
          )}
        </div>
        <section className="case-story" aria-label="Project story">
          <div className="case-overview">
            <span className="section-label">The idea</span>
            <h2>
              {project.eyebrow}
              {!/[.!?]$/.test(project.eyebrow) && (
                <span className="copper-period">.</span>
              )}
            </h2>
            <p>{project.description}</p>
            <div className="case-tools">
              <span>Built with</span>
              <p>{project.stack.join(" / ")}</p>
            </div>
          </div>
          <div className="case-narrative">
            <section>
              <h3>The problem</h3>
              <p>{project.challenge}</p>
            </section>
            <section>
              <h3>The approach</h3>
              <p>{project.approach}</p>
            </section>
            <section>
              <h3>What came out of it</h3>
              <p>{project.outcome}</p>
            </section>
            <ul className="case-highlights">
              {project.impact.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">↳</span>
                  {item}
                </li>
              ))}
            </ul>
            {!project.liveUrl && (
              <p className="deployment-note">
                {project.slug === "dev-clean"
                  ? "A command-line utility, distributed through GitHub."
                  : "Runs as a local research environment. There is no public deployment."}
              </p>
            )}
          </div>
        </section>
        <Link className="next-project" href={`/work/${nextProject.slug}`}>
          <div>
            <span className="section-label">
              Keep exploring · {nextProject.number} / 07
            </span>
            <h2>{nextProject.title}</h2>
            <p>{nextProject.eyebrow}</p>
          </div>
          <ArrowUpRight size={80} />
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
