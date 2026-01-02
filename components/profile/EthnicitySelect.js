'use client';

import { useState, useEffect } from 'react';
import { theme } from '@/utils/theme';
import toast from 'react-hot-toast';

export default function EthnicitySelect({ value = '', onChange }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      const response = await fetch('/api/master-tables/list?type=ethnicity');
      const result = await response.json();

      if (result.success) {
        setOptions(result.data);
      } else {
        toast.error('Failed to load ethnicity options');
      }
    } catch (error) {
      console.error('Error loading ethnicity options:', error);
      toast.error('Failed to load ethnicity options');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-2">
        <div className="h-12 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  // Add "Decline to state" option
  const allOptions = [
    ...options,
    { ethnicity_id: null, ethnicity_text: 'Decline to state' }
  ];

  return (
    <div className="relative">
      <select
        value={value || 'Decline to state'}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer hover:border-blue-300 transition-colors"
        style={{
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
        }}
      >
        <option value="Decline to state">Decline to state</option>
        {options.map((option) => (
          <option key={option.ethnicity_id} value={option.ethnicity_text}>
            {option.ethnicity_text}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
      </div>
    </div>
  );
}

