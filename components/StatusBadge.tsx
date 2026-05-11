/*
 * Project: WARAS_IoT
 * Author: Gerrio Irfan Pratama (2026)
 * 
 * This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 
 * International License (CC BY-NC 4.0).
 * strictly NON-COMMERCIAL USE ONLY. 
 * See the LICENSE file in the repository for full details.
 */
import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface StatusBadgeProps {
  isConnected: boolean;
  lastUpdate: number | null;
}

export default function StatusBadge({ isConnected, lastUpdate }: StatusBadgeProps) {
  // Fungsi untuk memformat timestamp terakhir menjadi string waktu yang mudah dibaca (HH:MM WIB).
  const formatLastUpdate = () => {
    if (!lastUpdate) return 'Belum ada data';
    
    const date = new Date(lastUpdate);
    
    const waktu = date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    }); 
    
    return `${waktu} WIB`;
  };

  return (
    <div className={`
      inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300
      /* Menerapkan kelas warna yang berbeda berdasarkan status koneksi (terhubung atau terputus). */
      ${isConnected 
        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/50' 
        : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50'
      }
    `}>
      {isConnected ? (
        // Tampilan saat sistem terhubung.
        <>
          <Wifi className="w-4 h-4" />
          <span className="hidden sm:inline">Terhubung</span>
        </>
      ) : (
        // Tampilan saat sistem terputus.
        <>
          <WifiOff className="w-4 h-4" />
          <span className="hidden sm:inline">Terputus</span>
        </>
      )}
      {/* Menampilkan waktu pembaruan data terakhir. */}
      <span className="text-xs opacity-75 font-normal ml-1">
        • {formatLastUpdate()}
      </span>
    </div>
  );
}
