'use client';

import { useState, useEffect } from 'react';
import { theme } from '@/utils/theme';
import toast from 'react-hot-toast';

export default function RaceSelect({ value = '', onChange }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      const response = await fetch('/api/master-tables/list?type=race');
      const result = await response.json();
      
      if (result.success) {
        setOptions(result.data);
      } else {
        toast.error('Failed to load race options');
      }
    } catch (error) {
      console.error('Error loading race options:', error);
      toast.error('Failed to load race options');
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
    { race_id: null, race_text: 'Decline to state' }
  ];

  return (
    <div className="space-y-2">
      {allOptions.map((option) => {
        const isSelected = value === option.race_text || 
          (value === '' && option.race_text === 'Decline to state');
        
        return (
          <label
            key={option.race_id || 'decline'}
            className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
              isSelected
                ? 'border-transparent shadow-sm'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            style={isSelected ? {
              background: `${theme.accentPrimary}08`,
              borderColor: `${theme.accentPrimary}30`,
            } : {}}
          >
            <input
              type="radio"
              name="race"
              checked={isSelected}
              onChange={() => onChange(option.race_text)}
              className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700 font-medium">
              {option.race_text}
            </span>
          </label>
        );
      })}
    </div>
  );
}

