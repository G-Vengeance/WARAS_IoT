/*
 * Project: WARAS_IoT
 * Author: Gerrio Irfan Pratama (2026)
 * 
 * This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 
 * International License (CC BY-NC 4.0).
 * strictly NON-COMMERCIAL USE ONLY. 
 * See the LICENSE file in the repository for full details.
 */
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">
        
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}