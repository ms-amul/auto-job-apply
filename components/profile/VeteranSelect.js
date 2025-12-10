'use client';

import { useState, useEffect } from 'react';
import { theme } from '@/utils/theme';
import toast from 'react-hot-toast';

export default function VeteranSelect({ value = null, onChange }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      const response = await fetch('/api/master-tables/list?type=veteran');
      const result = await response.json();
      
      if (result.success) {
        setOptions(result.data);
      } else {
        toast.error('Failed to load veteran options');
      }
    } catch (error) {
      console.error('Error loading veteran options:', error);
      toast.error('Failed to load veteran options');
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
    { veteran_disclosure_id: null, veteran_disclosure_text: 'Decline to state' }
  ];

  return (
    <div className="space-y-2">
      {allOptions.map((option) => {
        const isSelected = value === option.veteran_disclosure_id || 
          (value === null && option.veteran_disclosure_id === null);
        
        return (
          <label
            key={option.veteran_disclosure_id || 'decline'}
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
              name="veteran"
              checked={isSelected}
              onChange={() => onChange(option.veteran_disclosure_id)}
              className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700 font-medium">
              {option.veteran_disclosure_text}
            </span>
          </label>
        );
      })}
    </div>
  );
}

