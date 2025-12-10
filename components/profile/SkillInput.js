'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { theme } from '@/utils/theme';

export default function SkillInput({ label, placeholder, description, skills, onChange }) {
  const [inputValue, setInputValue] = useState('');

  const addSkill = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
      setInputValue('');
    }
  };

  const removeSkill = (skillToRemove) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">
        {label}
      </label>
      {description && (
        <p className="text-xs text-slate-500 mb-3">{description}</p>
      )}
      
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        <button
          type="button"
          onClick={addSkill}
          className="px-4 py-2.5 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all"
          style={{
            background: theme.getAccentGradient(135),
            boxShadow: `0 2px 8px ${theme.accentPrimary}25`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 4px 12px ${theme.accentPrimary}35`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 2px 8px ${theme.accentPrimary}25`;
          }}
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border font-medium transition-colors"
              style={{
                background: `${theme.accentPrimary}08`,
                color: theme.accentPrimary,
                borderColor: `${theme.accentPrimary}25`,
              }}
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="rounded-full p-0.5 transition-colors"
                style={{
                  color: theme.accentPrimary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${theme.accentPrimary}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

