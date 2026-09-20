"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolio";
import { ArrowUpRight, CloseIcon, MenuIcon } from "./icons";
import { useExperience } from "./experience-provider";

export function SiteHeader() {
  const { motion, toggleMotion } = useExperience();
  const menu = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const close = () => menu.current?.close();
  useEffect(close, [pathname]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Adnan Baig, home">
          adnan<span>baig</span>
          <i aria-hidden="true">✳</i>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/#work">
            Work <sup>07</sup>
          </Link>
          <Link href="/#about">About</Link>
          <a href="#contact">
            Let’s talk <ArrowUpRight size={15} />
          </a>
        </nav>
        <div className="header-controls">
          <button
            className="motion-control"
            role="switch"
            aria-checked={motion}
            aria-label="Animated motion"
            onClick={toggleMotion}
          >
            <span className="motion-bars" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span>Motion {motion ? "on" : "off"}</span>
          </button>
          <button
            className="menu-control"
            aria-label="Open navigation"
            onClick={() => menu.current?.showModal()}
          >
            <MenuIcon />
          </button>
        </div>
      </header>
      <dialog ref={menu} className="menu-dialog" aria-label="Navigation">
        <div className="menu-top">
          <span>Find your way.</span>
          <button aria-label="Close navigation" onClick={close}>
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          <Link onClick={close} href="/#work">
            The work <sup>07</sup>
          </Link>
          <Link onClick={close} href="/#about">
            The person
          </Link>
          <a onClick={close} href="#contact">
            Say hello <ArrowUpRight size={36} />
          </a>
        </nav>
        <p>Mumbai, India. Working everywhere.</p>
      </dialog>
    </>
  );
}

export function SiteFooter() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = profile.social.email;
    }
  };
  return (
    <footer id="contact" className="site-footer">
      <div className="contact-intro">
        <span className="status-dot" />
        Open to full-stack development roles and product collaborations.
      </div>
      <a className="contact-title" href={profile.social.email}>
        <span>
          Let’s talk about
          <br />
          your next product.
        </span>
        <ArrowUpRight size={110} />
      </a>
      <div className="contact-bottom">
        <div>
          <a className="email-link" href={profile.social.email}>
            {profile.email}
          </a>
          <button className="copy-email" onClick={copy} aria-live="polite">
            {copied ? "Copied ✓" : "Copy email ↗"}
          </button>
        </div>
        <div className="social-links">
          <a href={profile.social.github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={16} />
          </a>
          <a href={profile.social.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div className="footer-colophon">
        <span>© {new Date().getFullYear()} Adnan Baig</span>
        <span>Made with curiosity. In Mumbai.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
