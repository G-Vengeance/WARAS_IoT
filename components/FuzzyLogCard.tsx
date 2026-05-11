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
import { HistoricalDataPoint } from '@/lib/types';
import { BrainCircuit, Clock } from 'lucide-react';

interface FuzzyLogCardProps {
  data: HistoricalDataPoint[];
}

export default function FuzzyLogCard({ data }: FuzzyLogCardProps) {
  // Memproses data historis untuk mendapatkan log keputusan fuzzy.
  const fuzzyLogs = data
    // 1. Filter data untuk hanya menyertakan entri yang memiliki output dari logika fuzzy.
    .filter(item => item.fuzzy_rate !== undefined && item.durasi_buka !== undefined)
    // 2. Ambil 5 entri terakhir dari hasil filter.
    .slice(-5)
    // 3. Balik urutan array agar entri terbaru muncul di paling atas.
    .reverse();

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-indigo-50 dark:border-slate-700 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <BrainCircuit className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Fuzzy LA Decision Log</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400"></p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Jika tidak ada log fuzzy, tampilkan pesan placeholder. */}
        {fuzzyLogs.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
            No fuzzy decision data recorded yet...
          </p>
        ) : (
          // Jika ada log, render setiap entri log.
          fuzzyLogs.map((log, index) => {
            // Format timestamp menjadi string waktu yang mudah dibaca.
            const time = new Date(log.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-100 dark:border-slate-600 transition-all hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-200 dark:bg-purple-800/50 p-2 rounded-full">
                    <Clock className="w-4 h-4 text-purple-700 dark:text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{time}</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      pH: {log.ph} | DO: {log.do} | Temp: {log.temperature}°C
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                    Rate: {log.fuzzy_rate?.toFixed(1)}%
                  </p>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    Katup: {log.durasi_buka} ms
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}