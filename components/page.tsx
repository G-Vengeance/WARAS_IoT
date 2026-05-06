"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { useSensorData, useSystemControl, useHistoricalData, useConnectionStatus } from '@/lib/hooks';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import ControlPanel from '@/components/ControlPanel';
import { Thermometer, Droplet, Wind } from 'lucide-react';

// --- DYNAMIC IMPORT UNTUK SEMUA CHART ---
// Ini adalah praktik terbaik untuk memastikan komponen berat seperti chart
// hanya dimuat di browser dan tidak menyebabkan error di server.

const PredictiveChartCard = dynamic(() => import('@/components/PredictiveChartCard'), {
  ssr: false,
  loading: () => <div className="h-96 w-full rounded-xl bg-gray-100 dark:bg-slate-800 animate-pulse" />,
});

const MainChartCard = dynamic(() => import('@/components/ChartCard'), {
  ssr: false,
  loading: () => <div className="h-96 w-full rounded-xl bg-gray-100 dark:bg-slate-800 animate-pulse" />,
});


export default function DashboardPage() {
  // --- Mengambil semua data yang dibutuhkan oleh komponen-komponen di bawah ---
  const { sensorData, loading: sensorLoading } = useSensorData();
  const { control, loading: controlLoading, updating, updateMode, toggleActuator } = useSystemControl();
  const { historyData, loading: historyLoading } = useHistoricalData(150);
  const { isConnected, lastUpdate } = useConnectionStatus();

  const isLoading = sensorLoading || controlLoading;

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Dashboard WARAS
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Real-time Water Quality Analysis System
          </p>
        </div>
        <StatusBadge isConnected={isConnected} lastUpdate={lastUpdate} />
      </div>

      {/* --- GRID UTAMA --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Kolom Kiri (Lebar) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Kartu Statistik */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Water Temperature"
              value={isLoading ? '...' : sensorData?.temperature?.toFixed(1) || 0}
              unit="°C"
              icon={Thermometer}
              color="orange"
              minSafe={25}
              maxSafe={31}
            />
            <StatCard
              title="Tingkat pH"
              value={isLoading ? '...' : sensorData?.ph?.toFixed(2) || 0}
              unit=""
              icon={Droplet}
              color="blue"
              minSafe={6.5}
              maxSafe={8.5}
            />
            <StatCard
              title="Dissolved Oxygen"
              value={isLoading ? '...' : sensorData?.do?.toFixed(2) || 0}
              unit="mg/L"
              icon={Wind}
              color="green"
              minSafe={5}
            />
          </div>
          
          <PredictiveChartCard data={historyData} isLoading={historyLoading} />
        </div>

        {/* Kolom Kanan (Sempit) */}
        <div className="lg:col-span-1 space-y-6">
          {control && (
            <ControlPanel
              mode={control.mode}
              actuators={control.actuators}
              onModeChange={updateMode}
              onActuatorToggle={toggleActuator}
              disabled={updating || !isConnected}
            />
          )}
        </div>
      </div>
    </main>
  );
}