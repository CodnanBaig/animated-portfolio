"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "@/types";

export function ThemeProvider({ 
  children, 
  defaultTheme = "system",
  storageKey = "theme",
  ...props 
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      defaultTheme={defaultTheme}
      storageKey={storageKey}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}