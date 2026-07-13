"use client";

import Link from "next/link";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { capabilities, experience, principles, profile, projects } from "@/data/portfolio";
import { GithubFeed } from "./github-feed";
import {
  ArrowRight,
  ArrowUpRight,
  CheckIcon,
  CloseIcon,
  CopyIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MenuIcon,
} from "./icons";
import { ProjectVisual } from "./project-visual";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Profile", href: "#profile" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function useMotionSystem() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (reduce) {
      reveals.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    reveals.forEach((element) => observer.observe(element));

    let frame = 0;
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        document.documentElement.style.setProperty("--scroll-y", `${y}px`);
        parallax.forEach((element) => {
          const speed = Number(element.dataset.parallax || 0.08);
          const rect = element.getBoundingClientRect();
          const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
          element.style.setProperty("--parallax-y", `${offset}px`);
        });
        const progress = y / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        document.documentElement.style.setProperty("--scroll-progress", String(progress));
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Adnan Baig, back to top">
          <span>AB</span><i/>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <a className="header-cta" href={profile.social.email}>Start a conversation <ArrowUpRight size={16}/></a>
        <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <CloseIcon/> : <MenuIcon/>}
        </button>
      </header>
      <div className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-inner">
          <span className="micro-label">Navigate / 2026</span>
          {navItems.map((item, index) => (
            <a href={item.href} onClick={() => setOpen(false)} key={item.href}>
              <small>0{index + 1}</small>{item.label}<ArrowUpRight/>
            </a>
          ))}
          <div className="mobile-socials">
            <a href={profile.social.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </>
  );
}

function CursorLight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;
    const onMove = (event: PointerEvent) => {
      ref.current?.style.setProperty("--cursor-x", `${event.clientX}px`);
      ref.current?.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return <div className="cursor-light" ref={ref} aria-hidden="true"/>;
}

function KineticObject() {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    ref.current?.style.setProperty("--object-rx", `${y * -18}deg`);
    ref.current?.style.setProperty("--object-ry", `${x * 22}deg`);
    ref.current?.style.setProperty("--object-x", `${x * 18}px`);
    ref.current?.style.setProperty("--object-y", `${y * 18}px`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--object-rx", "-8deg");
    ref.current?.style.setProperty("--object-ry", "18deg");
    ref.current?.style.setProperty("--object-x", "0px");
    ref.current?.style.setProperty("--object-y", "0px");
  };
  return (
    <div className="kinetic-stage" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} data-parallax="0.045">
      <div className="orbit orbit-a"><i/><i/><i/></div>
      <div className="orbit orbit-b"><i/><i/></div>
      <div className="monolith">
        <div className="monolith-face face-front"><span>AB</span><small>PRODUCT / ENGINEERING</small></div>
        <div className="monolith-face face-side"/>
        <div className="monolith-face face-top"/>
        <div className="monolith-core"/>
      </div>
      <span className="stage-label label-one">SYSTEMS</span>
      <span className="stage-label label-two">INTERFACES</span>
      <span className="stage-label label-three">PRODUCT</span>
      <div className="stage-shadow"/>
    </div>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    ref.current?.style.setProperty("--tilt-x", `${y * -5}deg`);
    ref.current?.style.setProperty("--tilt-y", `${x * 7}deg`);
    ref.current?.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
    ref.current?.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  };
  const reset = () => {
    ref.current?.style.setProperty("--tilt-x", "0deg");
    ref.current?.style.setProperty("--tilt-y", "0deg");
  };
  return <div ref={ref} className={`tilt-card ${className}`} onMouseMove={onMove} onMouseLeave={reset}>{children}</div>;
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <article className={`project-card project-card-${index % 2 === 0 ? "wide" : "tall"} reveal`}>
      <Link href={`/work/${project.slug}`} className="project-link" aria-label={`Read case study: ${project.title}`}>
        <TiltCard className="project-visual-wrap"><ProjectVisual type={project.visual}/></TiltCard>
        <div className="project-card-copy">
          <div className="project-meta"><span>{project.number} / {project.eyebrow}</span><span>{project.year}</span></div>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <div className="project-stack">{project.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div>
          <span className="project-open">View case study <ArrowRight size={17}/></span>
        </div>
      </Link>
    </article>
  );
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = profile.social.email;
    }
  };
  return (
    <button className="copy-email" onClick={copy}>
      {copied ? <CheckIcon/> : <CopyIcon/>}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}

export function PortfolioShell() {
  useMotionSystem();

  return (
    <div className="site-shell" id="top">
      <CursorLight/>
      <div className="scroll-progress" aria-hidden="true"/>
      <Header/>

      <main>
        <section className="hero section-pad">
          <div className="hero-noise" aria-hidden="true"/>
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-status hero-enter"><i/><span>{profile.location}</span></div>
              <h1 className="hero-title hero-enter">
                <span>I build digital</span>
                <span>products that feel</span>
                <span className="serif-line">inevitable.</span>
              </h1>
              <div className="hero-bottom hero-enter">
                <p>{profile.intro}</p>
                <div className="hero-actions">
                  <a className="button button-primary magnetic" href="#work">Explore selected work <ArrowRight/></a>
                  <a className="button button-ghost magnetic" href={profile.social.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight/></a>
                </div>
              </div>
            </div>
            <KineticObject/>
          </div>
          <div className="hero-foot hero-enter">
            <span>Scroll to enter</span><i/>
            <span>Web · Mobile · AI · Music-tech</span>
          </div>
        </section>

        <div className="marquee" aria-label="Core disciplines">
          <div className="marquee-track">
            {["PRODUCT ENGINEERING", "INTERFACE SYSTEMS", "MOBILE EXPERIENCES", "AI WORKFLOWS", "MUSIC TECHNOLOGY", "PRODUCT ENGINEERING", "INTERFACE SYSTEMS", "MOBILE EXPERIENCES", "AI WORKFLOWS", "MUSIC TECHNOLOGY"].map((item, index) => (
              <span key={`${item}-${index}`}>{item}<i/></span>
            ))}
          </div>
        </div>

        <section className="profile-intro section-pad" id="profile">
          <div className="section-index reveal"><span>01</span><span>Profile</span></div>
          <div className="profile-statement reveal">
            <p className="statement-lead">I work at the intersection of</p>
            <h2>engineering precision, product judgement and creative instinct.</h2>
          </div>
          <div className="profile-detail-grid">
            <div className="profile-detail reveal">
              <span className="micro-label">The difference</span>
              <p>I do not see a screen as an isolated frontend task. I look for the operational model underneath it: who decides, what changes, what can fail, and how the product should explain itself.</p>
            </div>
            <div className="metric-grid reveal">
              {profile.metrics.map((metric) => (
                <div className="metric" key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className="work-section section-pad" id="work">
          <div className="section-heading reveal">
            <div className="section-index"><span>02</span><span>Selected work</span></div>
            <h2>Products built around real behaviour.</h2>
            <p>Case studies across operational software, AI-assisted tools, music-tech and mobile products.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => <ProjectCard project={project} index={index} key={project.slug}/>) }
          </div>
        </section>

        <section className="capabilities-section section-pad">
          <div className="capabilities-sticky reveal">
            <div className="section-index"><span>03</span><span>Capabilities</span></div>
            <h2>Broad enough to own the feature. Focused enough to obsess over it.</h2>
            <p>My strongest work happens when product thinking and implementation are not handed between silos.</p>
          </div>
          <div className="capabilities-list">
            {capabilities.map((capability) => (
              <article className="capability-row reveal" key={capability.number}>
                <span>{capability.number}</span>
                <div><h3>{capability.title}</h3><p>{capability.copy}</p></div>
                <div className="capability-tags">{capability.items.map((item) => <i key={item}>{item}</i>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="principles-section">
          <div className="principles-bg" data-parallax="0.08"/>
          <div className="section-pad principles-inner">
            <span className="micro-label reveal">Working principles / 03</span>
            {principles.map((principle, index) => (
              <p className="principle reveal" key={principle}><small>0{index + 1}</small>{principle}</p>
            ))}
          </div>
        </section>

        <section className="experience-section section-pad" id="experience">
          <div className="section-heading reveal">
            <div className="section-index"><span>04</span><span>Experience</span></div>
            <h2>Engineering informed by operating real products.</h2>
          </div>
          <div className="experience-list">
            {experience.map((item, index) => (
              <article className="experience-row reveal" key={item.company}>
                <span className="experience-number">0{index + 1}</span>
                <div className="experience-period">{item.period}<small>{item.location}</small></div>
                <div className="experience-role"><h3>{item.role}</h3><span>{item.company}</span></div>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="github-section section-pad">
          <div className="section-heading reveal">
            <div className="section-index"><span>05</span><span>GitHub</span></div>
            <h2>Public code, fetched live.</h2>
            <p>A direct window into the repositories connected to the portfolio.</p>
          </div>
          <GithubFeed/>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="contact-orbit" aria-hidden="true"><i/><i/><i/></div>
          <div className="contact-copy reveal">
            <span className="micro-label">Have a serious product to build?</span>
            <h2>Let&apos;s make the interface feel obvious—and the system behind it hold up.</h2>
            <div className="contact-actions">
              <a className="button button-primary button-large" href={profile.social.email}>Start a conversation <ArrowUpRight/></a>
              <CopyEmailButton/>
            </div>
          </div>
          <div className="contact-socials reveal">
            <a href={profile.social.github} target="_blank" rel="noreferrer"><GithubIcon/>GitHub<ArrowUpRight/></a>
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon/>LinkedIn<ArrowUpRight/></a>
            <a href={profile.social.email}><MailIcon/>Email<ArrowUpRight/></a>
          </div>
        </section>
      </main>

      <footer className="site-footer section-pad">
        <div className="footer-name">ADNAN <span>BAIG</span></div>
        <div className="footer-meta"><span>Full Stack Product Engineer</span><span>Mumbai · Remote</span><span>© {new Date().getFullYear()}</span></div>
      </footer>
    </div>
  );
}
