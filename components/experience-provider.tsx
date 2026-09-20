"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const ExperienceContext = createContext({
  motion: false,
  toggleMotion: () => {},
});

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [motion, setMotion] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("portfolio-motion");
      } catch {}
      setMotion(saved ? saved === "on" : !preference.matches);
    };
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = motion ? "on" : "off";
  }, [motion]);
  const toggleMotion = () =>
    setMotion((current) => {
      try {
        localStorage.setItem("portfolio-motion", current ? "off" : "on");
      } catch {}
      return !current;
    });
  return (
    <ExperienceContext.Provider value={{ motion, toggleMotion }}>
      {children}
    </ExperienceContext.Provider>
  );
}

export const useExperience = () => useContext(ExperienceContext);
