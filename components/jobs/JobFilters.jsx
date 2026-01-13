'use client';

import React from 'react';
import { MapPin, ChevronDown, Check, Search } from 'lucide-react';

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

export const JobFilters = ({
    location, setLocation,
    category, setCategory,
    filters, setFilters,
    counts = {}
}) => {
    const toggleFilter = (type, value) => {
        setFilters(prev => {
            const current = prev[type] || [];
            const updated = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            return { ...prev, [type]: updated };
        });
    };

    return (
        <div className="neu-card p-6 sticky top-24">
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
                        <option value="Technology">Technology</option>
                        <option value="Medical & Healthcare">Medical & Healthcare</option>
                        <option value="Finance & Fintech">Finance & Fintech</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
            </FilterSection>

            <FilterSection title="Industry">
                <CheckboxFilter
                    label="All"
                    checked={!filters.industry?.length}
                    onChange={() => setFilters(p => ({ ...p, industry: [] }))}
                    count={counts.total}
                />
                {['Software', 'Finance', 'Management', 'Advertising'].map(ind => (
                    <CheckboxFilter
                        key={ind}
                        label={ind}
                        checked={filters.industry?.includes(ind)}
                        onChange={() => toggleFilter('industry', ind)}
                        count={counts[ind.toLowerCase()]}
                    />
                ))}
            </FilterSection>

            <FilterSection title="Job Type">
                <CheckboxFilter
                    label="All"
                    checked={!filters.type?.length}
                    onChange={() => setFilters(p => ({ ...p, type: [] }))}
                    count={counts.total}
                />
                {['Full Time', 'Part Time', 'Contract', 'Temporary'].map(t => (
                    <CheckboxFilter
                        key={t}
                        label={t}
                        checked={filters.type?.includes(t)}
                        onChange={() => toggleFilter('type', t)}
                        count={counts[t.toLowerCase().replace(' ', '')]}
                    />
                ))}
            </FilterSection>

            <FilterSection title="Experience Level">
                <CheckboxFilter
                    label="All"
                    checked={!filters.experience?.length}
                    onChange={() => setFilters(p => ({ ...p, experience: [] }))}
                />
                {['Entry Level', 'Mid Level', 'Senior', 'Lead'].map(exp => (
                    <CheckboxFilter
                        key={exp}
                        label={exp}
                        checked={filters.experience?.includes(exp)}
                        onChange={() => toggleFilter('experience', exp)}
                    />
                ))}
            </FilterSection>
        </div>
    );
};
