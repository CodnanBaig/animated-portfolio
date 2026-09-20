"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects, experience } from "@/data/portfolio";
import { ArrowUpRight, ArrowRight } from "./icons";
import { SiteHeader, SiteFooter } from "./site-chrome";
import { Hero } from "./hero";
import { ProjectVisual, ProjectLinks } from "./project-visual";
import { useExperience } from "./experience-provider";

const featured = projects.slice(0, 3);
const otherWork = projects.slice(3);
const shortTitles = [
  "Money, with perspective.",
  "From ‘it broke’ to why.",
  "A first draft is a start.",
];

export function PortfolioShell() {
  const root = useRef<HTMLDivElement>(null);
  const { motion } = useExperience();
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<string | null>("mart-fight");

  useEffect(() => {
    const sections =
      root.current?.querySelectorAll<HTMLElement>(".featured-project");
    if (!sections) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-20% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!motion || !root.current) return;
    let disposed = false;
    let cleanup = () => {};
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          const media = gsap.matchMedia();
          media.add("(min-width: 900px)", () => {
            gsap.utils
              .toArray<HTMLElement>(".featured-project")
              .forEach((section, index) => {
                if (index === featured.length - 1) return;
                gsap.to(section.querySelector(".featured-inner"), {
                  scale: 0.94,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "bottom 85%",
                    end: "bottom 15%",
                    scrub: true,
                  },
                });
              });
            gsap.fromTo(
              ".portrait-wrap",
              { y: 55 },
              {
                y: -45,
                ease: "none",
                scrollTrigger: {
                  trigger: ".about-section",
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
            return () => {};
          });
        }, root);
        cleanup = () => context.revert();
      },
    );
    return () => {
      disposed = true;
      cleanup();
    };
  }, [motion]);

  return (
    <div ref={root} id="top">
      <SiteHeader />
      <main id="main">
        <Hero />

        <section
          id="work"
          className="work-section"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <span className="section-label">Selected projects</span>
              <h2 id="work-title">
                Full-stack work<span className="copper-period">.</span>
              </h2>
            </div>
            <p>
              Web applications, developer tools,
              <br />
              and the systems behind them.
            </p>
          </div>
          <div className="work-reel-nav">
            <span>In focus</span>
            <nav aria-label="Featured projects">
              {featured.map((project, index) => (
                <a
                  key={project.slug}
                  href={`#${project.slug}`}
                  aria-current={active === index ? "true" : undefined}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {project.title}
                </a>
              ))}
            </nav>
            <span className="reel-progress">
              <i style={{ transform: `scaleX(${(active + 1) / 3})` }} />
            </span>
          </div>
          <div className="featured-stack">
            {featured.map((project, index) => (
              <article
                id={project.slug}
                className={`featured-project project-${project.slug}`}
                key={project.slug}
                data-index={index}
                style={
                  {
                    zIndex: index + 1,
                    "--image-ratio":
                      (project.imageWidth || 1) / (project.imageHeight || 1),
                  } as React.CSSProperties
                }
              >
                <div className="featured-inner">
                  <div className="featured-heading">
                    <span className="project-sequence">
                      {project.number}
                      <span>/ 03</span>
                    </span>
                    <div>
                      <p>{project.eyebrow}</p>
                      <h3>
                        <Link href={`/work/${project.slug}`}>
                          {project.title}
                          <ArrowUpRight size={38} />
                        </Link>
                      </h3>
                    </div>
                    <Link className="case-link" href={`/work/${project.slug}`}>
                      Explore project
                      <ArrowUpRight size={19} />
                    </Link>
                  </div>
                  <div className="featured-stage">
                    <div className="stage-note">
                      <span>{shortTitles[index]}</span>
                      <span>
                        {index === 0
                          ? "A little clarity before the next decision."
                          : index === 1
                            ? "Capture. Replay. Understand."
                            : "Make the next draft a better one."}
                      </span>
                    </div>
                    <div className="stage-image">
                      <ProjectVisual project={project} priority={index === 0} />
                    </div>
                  </div>
                  <div className="featured-details">
                    <p>{project.summary}</p>
                    <ProjectLinks project={project} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="explorations" aria-labelledby="exploration-title">
          <div className="section-heading">
            <div>
              <span className="section-label">More projects</span>
              <h2 id="exploration-title">
                Further work<span className="copper-period">.</span>
              </h2>
            </div>
            <p>
              Backend systems, practical tooling,
              <br />and interactive experiences.
            </p>
          </div>
          <div className="project-index">
            {otherWork.map((project) => {
              const open = expanded === project.slug;
              return (
                <article
                  key={project.slug}
                  className={`index-project ${open ? "is-open" : ""}`}
                >
                  <h3>
                    <button
                      aria-expanded={open}
                      aria-controls={`panel-${project.slug}`}
                      id={`toggle-${project.slug}`}
                      onClick={() => setExpanded(open ? null : project.slug)}
                    >
                      <span className="index-number">{project.number}</span>
                      <span className="index-title">{project.title}</span>
                      <span className="index-category">{project.category}</span>
                      <span className="index-plus" aria-hidden="true">
                        {open ? "−" : "+"}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`panel-${project.slug}`}
                    className="index-panel"
                    role="region"
                    aria-labelledby={`toggle-${project.slug}`}
                    hidden={!open}
                  >
                    <div className={`index-image project-${project.slug}`}>
                      <ProjectVisual project={project} />
                    </div>
                    <div className="index-description">
                      <span className="section-label">{project.eyebrow}</span>
                      <p>{project.summary}</p>
                      <div className="project-stack">
                        {project.stack.join(" / ")}
                      </div>
                      <Link
                        className="text-link"
                        href={`/work/${project.slug}`}
                      >
                        Inside the project
                        <ArrowRight size={20} />
                      </Link>
                      <ProjectLinks project={project} />
                      {!project.liveUrl && (
                        <span className="deployment-note">
                          {project.slug === "dev-clean"
                            ? "Built for your terminal. Available on GitHub."
                            : "Local research environment. No public deployment."}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="about"
          className="about-section"
          aria-labelledby="about-title"
        >
          <div className="about-person">
            <div className="portrait-wrap">
              <img
                src="/portrait.jpg"
                width="900"
                height="1125"
                alt="Adnan Baig"
                loading="lazy"
              />
              <span className="portrait-stamp" aria-hidden="true">
                ab<span>✳</span>
              </span>
            </div>
            <div className="portrait-caption">
              <span>The person behind the work.</span>
              <span>Mumbai, IN ↗</span>
            </div>
          </div>
          <div className="about-copy">
            <span className="section-label">A little about me</span>
            <h2 id="about-title">
              I started with
              <br />
              the interface.
              <br />
              <span>I kept going.</span>
            </h2>
            <p>
              I’m a full-stack developer with a frontend foundation. My
              professional experience began at Kenmark ITan Solutions in October
              2021. My projects take that work across the stack: authentication,
              APIs, data ownership, persistence, and failure recovery.
            </p>
            <p>
              I use AI-assisted development to accelerate implementation and
              debugging, then review the code and validate behaviour with tests
              and reproducible checks. My approach is to break the problem down,
              make a testable change, and keep investigating until the behaviour
              is explainable.
            </p>
            <div className="experience-list">
              {experience.map((item) => (
                <div key={item.company}>
                  <span>{item.period.replace(" — ", " – ")}</span>
                  <h3>{item.company}</h3>
                  <p>{item.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="practice-line" aria-label="Areas of practice">
          <span>Interfaces</span>
          <i>✳</i>
          <span>Systems</span>
          <i>✳</i>
          <span>Experiments</span>
          <i>✳</i>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
