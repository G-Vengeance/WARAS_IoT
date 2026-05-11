/*
 * Project: WARAS_IoT
 * Author: Gerrio Irfan Pratama (2026)
 * 
 * This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 
 * International License (CC BY-NC 4.0).
 * strictly NON-COMMERCIAL USE ONLY. 
 * See the LICENSE file in the repository for full details.
 */
import React, { useEffect, useState, useRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  color: string;
  subtitle?: string;
  minSafe?: number; 
  maxSafe?: number; 
  animationDelay?: number;
}

export default function StatCard({
  title,
  value,
  unit,
  icon: Icon,
  color,
  subtitle,
  minSafe,
  maxSafe,
  animationDelay = 0,
}: StatCardProps) {
  // Objek untuk memetakan nama warna prop ke kelas CSS Tailwind.
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/50',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800/50',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800/50',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800/50',
  };

  const selectedColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  // State untuk mengontrol animasi fade-in dan slide-up saat komponen pertama kali muncul.
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // Menggunakan setTimeout untuk memberikan sedikit jeda sebelum animasi dimulai.
    const timer = setTimeout(() => setIsVisible(true), animationDelay);
    return () => clearTimeout(timer);
  }, [animationDelay]);

  // State untuk melacak tren data (naik, turun, atau stabil).
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('stable');
  const [trendText, setTrendText] = useState('Mengumpulkan data...');
  // `useRef` untuk menyimpan nilai terakhir yang signifikan, agar bisa membandingkan perubahan.
  const lastMeaningfulValue = useRef<number | null>(null);

  const currentValue = Number(value);

  // Logika untuk menentukan apakah nilai saat ini berada di luar rentang aman.
  // Hasilnya akan digunakan untuk mengubah gaya visual kartu (misal: border merah).
  const isDanger = (minSafe !== undefined && currentValue < minSafe) || (maxSafe !== undefined && currentValue > maxSafe);

  useEffect(() => {
    // 1. Inisialisasi: Jika nilai referensi belum ada, set nilai saat ini sebagai referensi awal.
    // Ini mencegah deteksi tren yang salah pada render pertama.
    if (lastMeaningfulValue.current === null || (lastMeaningfulValue.current === 0 && currentValue !== 0)) {
      lastMeaningfulValue.current = currentValue;
      setTrend('stable');
      setTrendText('Stabil');
      return; 
    }

    // 2. Hitung selisih antara nilai saat ini dan nilai referensi terakhir.
    const diff = currentValue - lastMeaningfulValue.current;

    // Threshold sensitif (0.01)
    if (Math.abs(diff) >= 0.01) {
      if (diff > 0) {
        setTrend('up');
        setTrendText(`Naik ${diff.toFixed(2)} ${unit}`);
      } else {
        setTrend('down');
        setTrendText(`Turun ${Math.abs(diff).toFixed(2)} ${unit}`);
      }
      // Perbarui nilai referensi dengan nilai saat ini.
      lastMeaningfulValue.current = currentValue;
    } 
  }, [currentValue, unit]);

  // Memformat nilai yang akan ditampilkan sesuai dengan unitnya.
  let displayValue = value;
  if (typeof value === 'number') {
    if (unit.includes('°C')) {
      displayValue = value.toFixed(1); // For Temperature: 36.5
    } else {
      displayValue = value.toFixed(2); // Untuk DO dan pH: 7.50
    }
  }

  return (
    <div className={`
      relative bg-gradient-to-br from-indigo-50/50 to-white dark:from-slate-800 dark:to-slate-900 
      rounded-xl shadow-lg border p-4 sm:p-6 
      transform transition-all duration-500 ease-out
      /* Terapkan gaya 'bahaya' atau 'normal' berdasarkan hasil pengecekan. */
      ${isDanger ? 'border-red-400 shadow-red-100 dark:shadow-red-900/20' : 'border-indigo-100 dark:border-indigo-900/50'}
      /* Terapkan gaya animasi berdasarkan state isVisible. */
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
    `}>
      
      {/* Kontainer utama untuk judul, nilai, dan ikon. */}
      <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 truncate transition-colors">
            {title}
          </p>
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white transition-colors">
              {displayValue}
            </h3>
            <span className="text-sm font-bold text-gray-500 dark:text-gray-400 transition-colors">
              {unit}
            </span>
          </div>
        </div>

        {/* Kontainer ikon dengan ukuran tetap untuk menjaga konsistensi tata letak. */}
        <div className={`flex flex-shrink-0 items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl border transition-colors duration-300 ${selectedColor}`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

      </div>
      
      {/* Area untuk menampilkan informasi tren data dan subtitle. */}
      <div className="mt-4 pt-3 sm:pt-4 border-t border-gray-100 dark:border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors">
        <div className="flex items-center gap-1.5 text-xs font-bold">
          {trend === 'up' && (
            <>
              <span className="text-emerald-600 dark:text-emerald-400 text-sm">↑</span>
              <span className="text-emerald-600 dark:text-emerald-400">{trendText}</span>
            </>
          )}
          {trend === 'down' && (
            <>
              <span className="text-red-600 dark:text-red-400 text-sm">↓</span>
              <span className="text-red-600 dark:text-red-400">{trendText}</span>
            </>
          )}
          {trend === 'stable' && (
            <>
              <span className="text-gray-400 dark:text-gray-500 text-sm">→</span>
              <span className="text-gray-500 dark:text-gray-400">{trendText}</span>
            </>
          )}
        </div>

        {subtitle && (
          <span className="text-[10px] sm:text-xs font-medium text-gray-400 dark:text-gray-500">
            {subtitle}
          </span>
        )}
      </div>

    </div>
  );
}