/*
 * Project: WARAS_IoT
 * Author: Gerrio Irfan Pratama (2026)
 * 
 * This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 
 * International License (CC BY-NC 4.0).
 * strictly NON-COMMERCIAL USE ONLY. 
 * See the LICENSE file in the repository for full details.
 */
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes"; 

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Komponen ini berfungsi sebagai pembungkus (wrapper) untuk menyediakan konteks tema
  // dari `next-themes` ke seluruh aplikasi. Semua komponen di dalam `children`
  // akan dapat mengakses dan mengubah tema (light/dark).
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}