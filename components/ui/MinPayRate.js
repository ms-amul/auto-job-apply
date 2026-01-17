'use client';

import React from 'react';

export default function MinPayRate({ value, onChange }) {
  // Ensure value is a valid number between 1 and 200
  const safeValue = Math.min(200, Math.max(1, value || 0));

  const handleChange = (newValue) => {
    onChange(Math.min(200, Math.max(1, parseInt(newValue) || 0)));
  };

  return (
    <div className="space-y-4 pt-4 px-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Minimum Desired Payrate (Per Hour)
          </label>
          <p className="text-xs text-slate-500 mt-0.5">Filter opportunities based on your compensation</p>
        </div>
        <div className="bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 flex items-center gap-1 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
          <span className="text-xl font-bold text-blue-600">$</span>
          <input
            type="number"
            min="1"
            max="200"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            className="w-14 bg-transparent text-xl font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-xs font-semibold text-blue-400">/hr</span>
        </div>
      </div>

      <div className="relative h-12 flex items-center group px-4">
        {/* Custom Track */}
        <div className="absolute inset-0 h-3 my-auto bg-slate-100 rounded-full overflow-hidden border border-white">
          <div
            className="h-full bg-linear-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${((safeValue - 1) / (200 - 1)) * 100}%` }}
          />
        </div>

        <input
          type="range"
          min="1"
          max="200"
          step="1"
          value={safeValue}
          onChange={(e) => handleChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        {/* Custom Thumb (Visual only) */}
        <div
          className="absolute w-6 h-6 bg-white border-2 border-blue-500 rounded-full shadow-lg pointer-events-none transition-all duration-300 transform group-hover:scale-110"
          style={{
            left: `calc(${((safeValue - 1) / (200 - 1)) * 100}% - 12px)`,
            top: '50%',
            marginTop: '-12px'
          }}
        >
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full m-auto mt-[7px]" />
        </div>
      </div>

      <div className="flex justify-between px-1">
        <span className="text-[10px] font-bold text-slate-400">$1/hr</span>
        <span className="text-[10px] font-bold text-slate-400">$200/hr</span>
      </div>
    </div>
  );
}
