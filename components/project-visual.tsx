"use client";

import { useRef } from "react";
import type { Project } from "@/data/portfolio";
import { ArrowUpRight, CloseIcon } from "./icons";

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-links">
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noreferrer">
          {project.liveLabel || "Visit project"}
          <ArrowUpRight size={16} />
        </a>
      )}
      <a href={project.githubUrl} target="_blank" rel="noreferrer">
        GitHub{project.sourcePrivate ? " (private)" : ""}
        <ArrowUpRight size={16} />
      </a>
    </div>
  );
}

export function ProjectVisual({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  if (!project.image)
    return (
      <div className="terminal-visual">
        <div className="terminal-top">
          <span>
            <i />
            <i />
            <i />
          </span>
          <span>dev-clean · command reference</span>
        </div>
        <div className="terminal-content">
          <span className="terminal-comment">
            # First, see what’s taking up space.
          </span>
          <code>
            <b>$</b> node bin/dev-clean.js inspect --path ./workspace
          </code>
          <span className="terminal-comment"># Make the plan inspectable.</span>
          <code>
            <b>$</b> node bin/dev-clean.js plan --path ./workspace
            <br /> --output cleanup-plan.json
          </code>
          <span className="terminal-comment">
            # Preview it. Dry run is the default.
          </span>
          <code>
            <b>$</b> node bin/dev-clean.js apply cleanup-plan.json
            <br /> --path ./workspace
          </code>
          <div className="terminal-foot">
            <span>Inspect → Plan → Quarantine → Restore</span>
            <span>v0.2</span>
          </div>
        </div>
      </div>
    );
  if (project.secondaryImage)
    return (
      <div className="paired-screens">
        <ProjectVisual
          project={{ ...project, secondaryImage: undefined }}
          priority={priority}
        />
        <ProjectVisual
          project={{
            ...project,
            title: `${project.title} insights`,
            image: project.secondaryImage,
            secondaryImage: undefined,
          }}
          priority={priority}
        />
      </div>
    );
  return (
    <>
      <button
        className="project-image-button"
        aria-label={`Enlarge ${project.title} screenshot`}
        onClick={() => dialog.current?.showModal()}
      >
        <img
          src={project.image}
          width={project.imageWidth}
          height={project.imageHeight}
          alt={`${project.title} application interface`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
        <span className="image-inspect">
          View full image <span aria-hidden="true">↗</span>
        </span>
      </button>
      <dialog
        ref={dialog}
        className="image-dialog"
        aria-label={`${project.title} screenshot`}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="image-dialog-top">
          <span>{project.title}</span>
          <button
            onClick={() => dialog.current?.close()}
            aria-label="Close screenshot"
          >
            <CloseIcon />
          </button>
        </div>
        <img
          src={project.image}
          width={project.imageWidth}
          height={project.imageHeight}
          alt={`${project.title} full application screenshot`}
        />
        <p>Original image proportions. Every detail intact.</p>
      </dialog>
    </>
  );
}
