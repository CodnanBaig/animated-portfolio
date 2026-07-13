type IconProps = { size?: number; className?: string };

const base = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
  "aria-hidden": true,
});

export function ArrowUpRight({ size = 18, className }: IconProps) {
  return <svg {...base(size, className)}><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>;
}
export function ArrowRight({ size = 18, className }: IconProps) {
  return <svg {...base(size, className)}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>;
}
export function ArrowLeft({ size = 18, className }: IconProps) {
  return <svg {...base(size, className)}><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>;
}
export function GithubIcon({ size = 20, className }: IconProps) {
  return <svg {...base(size, className)}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.28-.36 6.72-1.61 6.72-7.25A5.65 5.65 0 0 0 19.22 3.3 5.3 5.3 0 0 0 19.07 0S17.9-.36 15 1.48a13.38 13.38 0 0 0-6 0C6.1-.36 4.93 0 4.93 0a5.3 5.3 0 0 0-.15 3.3 5.65 5.65 0 0 0-1.5 3.95c0 5.63 3.44 6.88 6.72 7.25A4.8 4.8 0 0 0 9 18v4"/><path d="M9 19c-3 .92-3-1.5-4.2-2"/></svg>;
}
export function LinkedinIcon({ size = 20, className }: IconProps) {
  return <svg {...base(size, className)}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
}
export function MailIcon({ size = 20, className }: IconProps) {
  return <svg {...base(size, className)}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 6L2 7"/></svg>;
}
export function CopyIcon({ size = 18, className }: IconProps) {
  return <svg {...base(size, className)}><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>;
}
export function CheckIcon({ size = 18, className }: IconProps) {
  return <svg {...base(size, className)}><path d="m20 6-11 11-5-5"/></svg>;
}
export function MenuIcon({ size = 22, className }: IconProps) {
  return <svg {...base(size, className)}><path d="M4 7h16"/><path d="M4 17h16"/></svg>;
}
export function CloseIcon({ size = 22, className }: IconProps) {
  return <svg {...base(size, className)}><path d="m6 6 12 12"/><path d="M18 6 6 18"/></svg>;
}
export function StarIcon({ size = 16, className }: IconProps) {
  return <svg {...base(size, className)}><path d="m12 2 3 6 6.5.9-4.7 4.6 1.1 6.5-5.9-3.1L6.1 20l1.1-6.5L2.5 8.9 9 8l3-6Z"/></svg>;
}
export function GitForkIcon({ size = 16, className }: IconProps) {
  return <svg {...base(size, className)}><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><path d="M12 12v3"/></svg>;
}
