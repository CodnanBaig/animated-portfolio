// Common component props
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// Navigation types
export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface NavBarProps extends BaseProps {
  items?: NavItem[];
  isScrolled?: boolean;
}

export interface NavLinkProps {
  item: NavItem;
  pathname: string;
}

// Theme types
export interface ThemeProviderProps extends BaseProps {
  defaultTheme?: 'dark' | 'light' | 'system';
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

// Footer types
export interface FooterLink {
  title: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps extends BaseProps {
  sections: FooterSection[];
  copyright?: string;
}

// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface ProjectCardProps extends BaseProps {
  project: Project;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormProps extends BaseProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}

// Animation types
export interface AnimationProps extends BaseProps {
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

// Section types
export interface SectionProps extends BaseProps {
  id: string;
  title?: string;
  subtitle?: string;
  fullWidth?: boolean;
}

// Icon types
export interface IconProps extends BaseProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

// Button types
export interface ButtonProps extends BaseProps {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
}

// Card types
export interface CardProps extends BaseProps {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

// Toast types
export interface ToastProps extends BaseProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

// Utility types
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
}; 