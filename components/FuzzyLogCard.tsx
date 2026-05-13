/*
 * Project: WARAS_IoT
 * Author: Gerrio Irfan Pratama (2026)
 * 
 * This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 
 * International License (CC BY-NC 4.0).
 * strictly NON-COMMERCIAL USE ONLY. 
 * See the LICENSE file in the repository for full details.
 */
import React, { useState } from 'react';
import { HistoricalDataPoint } from '@/lib/types';
import { BrainCircuit, Clock, Download } from 'lucide-react';
import { useAuth } from '@/lib/hooks';
import AuthModal from './AuthModal';

interface FuzzyLogCardProps {
  data: HistoricalDataPoint[];
}

// Fungsi helper untuk menerjemahkan fuzzy_rate menjadi label & style yang user-friendly.
// Dipindahkan ke luar komponen agar bisa digunakan kembali oleh fungsi ekspor.
const getDecisionStyle = (rate: number | undefined) => {
  const r = rate ?? 0;
  if (r > 75) {
    return { label: 'Intensive', className: 'text-red-600 dark:text-red-400' };
  }
  if (r > 30) {
    return { label: 'Normal', className: 'text-indigo-600 dark:text-indigo-400' };
  }
  if (r > 0) {
    return { label: 'Light', className: 'text-emerald-600 dark:text-emerald-400' };
  }
  return { label: 'No Action', className: 'text-gray-500 dark:text-gray-400' };
};

export default function FuzzyLogCard({ data }: FuzzyLogCardProps) {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Data untuk ditampilkan di UI (5 log terakhir)
  const displayLogs = data
    .filter(item => item.fuzzy_rate !== undefined && item.durasi_buka !== undefined)
    .slice(-5)
    .reverse();

  // Data lengkap untuk diekspor, diurutkan berdasarkan waktu dari yang terlama ke terbaru
  const fullFuzzyLogsForExport = data
    .filter(item => item.fuzzy_rate !== undefined && item.durasi_buka !== undefined)
    .sort((a, b) => a.timestamp - b.timestamp);

  const triggerDownload = (uri: string, filename: string) => {
    const link = document.createElement('a');
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(uri); // Membersihkan URL objek setelah diunduh
  };

  const generateCSV = (logs: HistoricalDataPoint[]) => {
    const headers = ['Timestamp', 'Full Time', 'pH', 'DO', 'Temperature', 'Fuzzy Rate (%)', 'Decision', 'Valve Duration (ms)'].join(',');
    const csvRows = logs.map(log => {
      const dateStr = new Date(log.timestamp).toISOString().replace(/T|Z/g, ' ');
      const decisionLabel = getDecisionStyle(log.fuzzy_rate).label;
      const values = [
        log.timestamp,
        dateStr,
        log.ph?.toFixed(2) ?? 'N/A',
        log.do?.toFixed(2) ?? 'N/A',
        log.temperature?.toFixed(1) ?? 'N/A',
        log.fuzzy_rate?.toFixed(0) ?? 'N/A',
        `"${decisionLabel}"`, // Menggunakan kutip untuk handle koma di label jika ada
        log.durasi_buka ?? 'N/A'
      ];
      return values.join(',');
    });
    
    const csvString = `${headers}\n${csvRows.join('\n')}`;
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const dateString = new Date().toISOString().split('T')[0];
    triggerDownload(url, `Fuzzy_Decision_Log_${dateString}.csv`);
  };

  const generateXML = (logs: HistoricalDataPoint[]) => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<FuzzyDecisionLog>\n';
    logs.forEach(log => {
      const decisionLabel = getDecisionStyle(log.fuzzy_rate).label;
      xml += '  <Record>\n';
      xml += `    <Timestamp>${log.timestamp}</Timestamp>\n`;
      xml += `    <FullTime>${new Date(log.timestamp).toISOString().replace(/T|Z/g, ' ')}</FullTime>\n`;
      xml += `    <pH>${log.ph?.toFixed(2) ?? 'N/A'}</pH>\n`;
      xml += `    <DO>${log.do?.toFixed(2) ?? 'N/A'}</DO>\n`;
      xml += `    <Temperature>${log.temperature?.toFixed(1) ?? 'N/A'}</Temperature>\n`;
      xml += `    <FuzzyRate>${log.fuzzy_rate?.toFixed(0) ?? 'N/A'}</FuzzyRate>\n`;
      xml += `    <Decision>${decisionLabel}</Decision>\n`;
      xml += `    <ValveDuration>${log.durasi_buka ?? 'N/A'}</ValveDuration>\n`;
      xml += '  </Record>\n';
    });
    xml += '</FuzzyDecisionLog>';

    const blob = new Blob([xml], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const dateString = new Date().toISOString().split('T')[0];
    triggerDownload(url, `Fuzzy_Decision_Log_${dateString}.xml`);
  };

  const handleProtectedExport = (format: 'csv' | 'xml') => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (fullFuzzyLogsForExport.length === 0) {
      alert("No fuzzy log data to export.");
      return;
    }

    setIsExporting(true);
    try {
      if (format === 'csv') {
        generateCSV(fullFuzzyLogsForExport);
      } else {
        generateXML(fullFuzzyLogsForExport);
      }
    } catch (error) {
      console.error("Failed to export fuzzy logs:", error);
      alert("An error occurred during export.");
    } finally {
      setTimeout(() => setIsExporting(false), 1000); // Beri jeda agar user melihat feedback
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-indigo-50/50 to-white dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl shadow-lg border border-indigo-100 dark:border-indigo-900/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <BrainCircuit className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Fuzzy LA Decision Log</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Last 5 recorded actions</p>
            </div>
          </div>

          {/* Tombol Ekspor */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button 
              onClick={() => handleProtectedExport('csv')}
              disabled={isExporting}
              className="text-xs font-bold px-4 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 hover:shadow-sm transition-all disabled:opacity-50"
              title="Export full log to CSV"
            >
              {isExporting ? '...' : 'CSV'}
            </button>
            <button 
              onClick={() => handleProtectedExport('xml')}
              disabled={isExporting}
              className="text-xs font-bold px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-sm transition-all disabled:opacity-50"
              title="Export full log to XML"
            >
              {isExporting ? '...' : 'XML'}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {/* Jika tidak ada log fuzzy, tampilkan pesan placeholder. */}
          {displayLogs.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
              No fuzzy decision data recorded yet...
            </p>
          ) : (
            // Jika ada log, render setiap entri log.
            displayLogs.map((log, index) => {
              // Format timestamp menjadi string waktu yang mudah dibaca.
              const time = new Date(log.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

              const decision = getDecisionStyle(log.fuzzy_rate);

              return (
                <div key={index} className="flex items-center justify-between gap-4 p-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg border border-indigo-50 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-200 dark:bg-purple-800/50 p-2 rounded-full">
                      <Clock className="w-4 h-4 text-purple-700 dark:text-purple-300" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{time}</p>
                      <div className="flex items-center gap-x-3 gap-y-1 flex-wrap text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                        <span className="font-medium">pH: <strong className="font-bold text-gray-600 dark:text-gray-300">{log.ph?.toFixed(2)}</strong></span>
                        <span className="font-medium">DO: <strong className="font-bold text-gray-600 dark:text-gray-300">{log.do?.toFixed(2)}</strong></span>
                        <span className="font-medium">Temp: <strong className="font-bold text-gray-600 dark:text-gray-300">{log.temperature?.toFixed(1)}°C</strong></span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right w-24 flex-shrink-0">
                    <p className={`text-sm font-extrabold ${decision.className}`}>
                      {decision.label}
                    </p>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      Valve: {log.durasi_buka} ms
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal otentikasi yang akan ditampilkan jika diperlukan. */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => {
          setIsAuthModalOpen(false);
        }} 
      />
    </>
  );
}