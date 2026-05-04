import React from 'react';
import { HistoricalDataPoint } from '@/lib/types';
import { BrainCircuit, Clock } from 'lucide-react';

interface FuzzyLogCardProps {
  data: HistoricalDataPoint[];
}

export default function FuzzyLogCard({ data }: FuzzyLogCardProps) {
  // Ambil 5 data history terakhir yang memiliki nilai fuzzy, lalu balik urutannya (terbaru di atas)
  const fuzzyLogs = data
    .filter(item => item.fuzzy_rate !== undefined && item.fuzzy_interval !== undefined)
    .slice(-5)
    .reverse();

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-indigo-50 dark:border-slate-700 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <BrainCircuit className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Log Keputusan Fuzzy</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Riwayat prediksi porsi & jeda pakan otomatis</p>
        </div>
      </div>

      <div className="space-y-3">
        {fuzzyLogs.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
            Belum ada data Fuzzy yang terekam dari alat...
          </p>
        ) : (
          fuzzyLogs.map((log, index) => {
            const time = new Date(log.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-100 dark:border-slate-600 transition-all hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-200 dark:bg-purple-800/50 p-2 rounded-full">
                    <Clock className="w-4 h-4 text-purple-700 dark:text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{time} WIB</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      pH: {log.ph} | DO: {log.do} | Suhu: {log.temperature}°C
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                    Rate: {log.fuzzy_rate?.toFixed(1)}%
                  </p>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    Jeda: {log.fuzzy_interval?.toFixed(1)} Jam
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