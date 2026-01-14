'use client';

import React from 'react';
import { Search, MapPin, ChevronDown, Check, Filter, Trash2 } from 'lucide-react';

export const FilterSection = ({ title, children }) => (
    <div className="mb-8">
        <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider flex items-center gap-2">
            <span className="w-1 h-3 bg-blue-600 rounded-full"></span>
            {title}
        </h3>
        {children}
    </div>
);

export const CheckboxFilter = ({ label, count, checked, onChange }) => (
    <label className="flex items-center justify-between group cursor-pointer py-1.5">
        <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-200 group-hover:border-blue-400'
                }`}>
                {checked && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className={`text-sm transition-colors ${checked ? 'text-slate-900 font-semibold' : 'text-slate-600 group-hover:text-slate-900'}`}>
                {label}
            </span>
        </div>
        {count !== undefined && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                {count}
            </span>
        )}
        <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    </label>
);

export const JobFilters = ({ location, setLocation, category, setCategory, filters, setFilters, counts, onClearAll, payRange = [0, 200], setPayRange, options = {}, title, setTitle }) => {
    const toggleFilter = (section, value) => {
        setFilters(prev => {
            const current = prev[section] || [];
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value];
            return { ...prev, [section]: updated };
        });
    };

    return (
        <div className="neu-card sticky relative top-0 overflow-y-auto max-h-screen">
            <div className="flex items-center justify-between mb-6 sticky top-0 w-full z-10 bg-white/70 backdrop-blur-md p-4 border-b border-slate-100/50 shadow-sm">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-indigo-600" />
                        <h2 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Filters</h2>
                    </div>
                    <button
                        onClick={onClearAll}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-500 bg-rose-50 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-all active:scale-95"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        Clear
                    </button>
                </div>
            </div>
            <div className='p-6 pt-2 space-y-8'>
                <FilterSection title="Job Title">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search job title..."
                            value={title || ''}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                    </div>
                </FilterSection>

                <FilterSection title="Company">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search company..."
                            value={filters.company || ''}
                            onChange={(e) => setFilters(prev => ({ ...prev, company: e.target.value }))}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                    </div>
                </FilterSection>

                <FilterSection title="Location">
                    <div className="relative group">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="City, State"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                    </div>
                </FilterSection>

                <FilterSection title="Category">
                    <div className="relative group">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
                        >
                            <option value="">Select Category</option>
                            {(options.categories || []).map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                </FilterSection>

                <FilterSection title="Pay Rate ($/hr)">
                    <div className="px-1">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-700">${options.minPay || 0}</span>
                            <span className="text-xs font-bold text-slate-700">${options.maxPay || 200}+</span>
                        </div>
                        <div className="relative h-10 w-full group">
                            {/* Track Background */}
                            <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-100 rounded-full -translate-y-1/2 overflow-hidden">
                                {/* Active Range Highlight */}
                                <div
                                    className="absolute h-full bg-blue-500 rounded-full opacity-30 group-hover:opacity-100 transition-opacity"
                                    style={{
                                        left: `${((payRange[0] - (options.minPay || 0)) / ((options.maxPay || 200) - (options.minPay || 0))) * 100}%`,
                                        width: `${((payRange[1] - payRange[0]) / ((options.maxPay || 200) - (options.minPay || 0))) * 100}%`
                                    }}
                                />
                            </div>

                            {/* Range Inputs */}
                            <input
                                type="range"
                                min={options.minPay || 0}
                                max={options.maxPay || 200}
                                value={payRange[0]}
                                onChange={(e) => {
                                    const val = Math.min(Number(e.target.value), payRange[1] - 1);
                                    setPayRange([val, payRange[1]]);
                                }}
                                className="absolute top-1/2 left-0 w-full -translate-y-1/2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-grab active:[&::-webkit-slider-thumb]:cursor-grabbing z-5"
                            />
                            <input
                                type="range"
                                min={options.minPay || 0}
                                max={options.maxPay || 200}
                                value={payRange[1]}
                                onChange={(e) => {
                                    const val = Math.max(Number(e.target.value), payRange[0] + 1);
                                    setPayRange([payRange[0], val]);
                                }}
                                className="absolute top-1/2 left-0 w-full -translate-y-1/2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-grab active:[&::-webkit-slider-thumb]:cursor-grabbing z-5"
                            />
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-1">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100 min-w-[60px] text-center">
                                ${payRange[0]}
                            </span>
                            <span className="text-slate-400 font-bold">-</span>
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100 min-w-[60px] text-center">
                                ${payRange[1]}
                            </span>
                        </div>
                    </div>
                </FilterSection>

                <FilterSection title="Job Type">
                    <CheckboxFilter
                        label="All"
                        checked={!filters.type?.length}
                        onChange={() => setFilters(p => ({ ...p, type: [] }))}
                        count={counts.total}
                    />
                    {(options.jobTypes || []).map(t => (
                        <CheckboxFilter
                            key={t}
                            label={t}
                            checked={filters.type?.includes(t)}
                            onChange={() => toggleFilter('type', t)}
                        // We don't have individual counts per type pre-calculated easily without iterating all jobs, simpler to omit or calc in parent
                        />
                    ))}
                </FilterSection>
            </div>
        </div>
    );
};
