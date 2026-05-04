import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HistoricalDataPoint } from '@/lib/types';
import { BrainCircuit } from 'lucide-react';

interface FuzzyChartProps {
  data: HistoricalDataPoint[];
}

export default function FuzzyChart({ data }: FuzzyChartProps) {
  // Format waktu untuk sumbu X
  const formattedData = data.map(item => ({
    ...item,
    time: new Date(item.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  }));

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-indigo-50 dark:border-slate-700 mt-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <BrainCircuit className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Keputusan Fuzzy Logic</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400"></p>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} tickMargin={10} />
            <YAxis stroke="#9ca3af" fontSize={12} domain={[0, 100]} />
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#8b5cf6', fontWeight: 'bold' }}
            />
            <Area 
              type="monotone" 
              dataKey="fuzzy_rate" 
              name="Feeding Rate (%)" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRate)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}