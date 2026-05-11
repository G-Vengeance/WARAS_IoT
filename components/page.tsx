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

import React from 'react';
import dynamic from 'next/dynamic';
import { useSensorData, useSystemControl, useHistoricalData, useConnectionStatus } from '@/lib/hooks';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import ControlPanel from '@/components/ControlPanel';
import { Thermometer, Droplet, Wind } from 'lucide-react';

// Melakukan dynamic import untuk komponen chart.
// Ini adalah optimasi kinerja untuk memastikan komponen berat (seperti grafik)
// hanya dirender di sisi klien (browser), bukan di server.
// `ssr: false` menonaktifkan Server-Side Rendering untuk komponen ini.
// `loading` menampilkan UI placeholder (skeleton) saat komponen sedang dimuat.
const PredictiveChartCard = dynamic(() => import('@/components/PredictiveChartCard'), {
  ssr: false,
  loading: () => <div className="h-96 w-full rounded-xl bg-gray-100 dark:bg-slate-800 animate-pulse" />,
});

// Komponen ChartCard juga dimuat secara dinamis dengan alasan yang sama.
const MainChartCard = dynamic(() => import('@/components/ChartCard'), {
  ssr: false,
  loading: () => <div className="h-96 w-full rounded-xl bg-gray-100 dark:bg-slate-800 animate-pulse" />,
});

export default function DashboardPage() {
  // Menggunakan custom hooks untuk mengambil dan mengelola state aplikasi.
  // Setiap hook bertanggung jawab atas satu bagian data (sensor, kontrol, histori, status koneksi).
  const { sensorData, loading: sensorLoading } = useSensorData();
  const { control, loading: controlLoading, updating, updateMode, toggleActuator } = useSystemControl();
  const { historyData, loading: historyLoading } = useHistoricalData(150);
  const { isConnected, lastUpdate } = useConnectionStatus();

  // Menentukan status loading keseluruhan halaman.
  const isLoading = sensorLoading || controlLoading;

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Bagian Header Halaman */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Dashboard WARAS</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Real-time Water Quality Analysis System
          </p>
        </div>
        <StatusBadge isConnected={isConnected} lastUpdate={lastUpdate} />
      </div>

      {/* Grid Utama untuk Tata Letak Konten */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Kolom Kiri: Menampilkan data statistik dan grafik prediktif. */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kartu untuk menampilkan data sensor suhu air. */}
            <StatCard
              title="Water Temperature"
              value={isLoading ? '...' : sensorData?.temperature?.toFixed(1) || 0}
              unit="°C"
              icon={Thermometer}
              color="orange"
              minSafe={25}
              maxSafe={31}
            />
            {/* Kartu untuk menampilkan data sensor pH. */}
            <StatCard
              title="Tingkat pH"
              value={isLoading ? '...' : sensorData?.ph?.toFixed(2) || 0}
              unit=""
              icon={Droplet}
              color="blue"
              minSafe={6.5}
              maxSafe={8.5}
            />
            {/* Kartu untuk menampilkan data sensor Dissolved Oxygen (DO). */}
            <StatCard
              title="Dissolved Oxygen"
              value={isLoading ? '...' : sensorData?.do?.toFixed(2) || 0}
              unit="mg/L"
              icon={Wind}
              color="green"
              minSafe={5}
            />
          </div>
          
          {/* Komponen untuk menampilkan grafik analisis prediktif. */}
          <PredictiveChartCard data={historyData} isLoading={historyLoading} />
        </div>

        {/* Kolom Kanan: Menampilkan panel kontrol sistem. */}
        <div className="lg:col-span-1 space-y-6">
          {/* Panel kontrol hanya dirender jika data kontrol sudah tersedia. */}
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