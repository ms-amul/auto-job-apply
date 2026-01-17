'use client';

import { useState, useEffect } from 'react';
import SectionCard from '../SectionCard';
import SkillInput from '../SkillInput';
import { Plus, X, GraduationCap, Award, Sparkles } from 'lucide-react';
import { theme } from '@/utils/theme';
import toast from 'react-hot-toast';
import { CardLoader } from '@/components/ui/Loader';

export default function SkillsExperienceTab({ userId }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    technical_skills: [],
    soft_skills: [],
    languages: [],
    total_experience_years: 0,
    education: [],
    certifications: [],
  });

  useEffect(() => {
    loadData();
  }, [userId]);

  const loadData = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/users/${userId}/profile/skills-experience`);
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        toast.error(result.error || 'Failed to load data');
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const addEducation = () => {
    setData(prev => ({
      ...prev,
      education: [...prev.education, {
        degree: '',
        school: '',
        field: '',
        year: '',
        gpa: '',
      }],
    }));
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: value };
    setData(prev => ({ ...prev, education: updated }));
  };

  const removeEducation = (index) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const addCertification = () => {
    setData(prev => ({
      ...prev,
      certifications: [...prev.certifications, {
        name: '',
        issuer: '',
        date: '',
        expiry_date: '',
        credential_id: '',
        credential_url: '',
      }],
    }));
  };

  const updateCertification = (index, field, value) => {
    const updated = [...data.certifications];
    updated[index] = { ...updated[index], [field]: value };
    setData(prev => ({ ...prev, certifications: updated }));
  };

  const removeCertification = (index) => {
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/users/${userId}/profile/skills-experience`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Skills, education, and certifications updated successfully!');
      } else {
        toast.error(result.error || 'Failed to update data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Failed to update data');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <CardLoader text='Loading skills...' />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Skills Section */}
      <SectionCard title="Skills & Expertise" description="Add your skills to match with relevant opportunities" icon={Sparkles}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Total Years of Experience
            </label>
            <input
              type="number"
              value={data.total_experience_years}
              onChange={(e) => updateField('total_experience_years', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
              min="0"
            />
          </div>

          <SkillInput
            label="Technical Skills"
            placeholder="e.g., React, Node.js, Python, AWS"
            description="Programming languages, frameworks, and technologies"
            skills={data.technical_skills}
            onChange={(skills) => updateField('technical_skills', skills)}
          />

          <SkillInput
            label="Soft Skills"
            placeholder="e.g., Leadership, Communication, Problem Solving"
            description="Interpersonal and professional skills"
            skills={data.soft_skills}
            onChange={(skills) => updateField('soft_skills', skills)}
          />

          <SkillInput
            label="Languages"
            placeholder="e.g., English (Native), Spanish (Fluent)"
            description="Spoken languages and proficiency level"
            skills={data.languages}
            onChange={(skills) => updateField('languages', skills)}
          />
        </div>
      </SectionCard>

      {/* Education Section */}
      <SectionCard title="Education" description="Add your educational background" icon={GraduationCap}>
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index} className="p-5 border border-gray-200 rounded-xl bg-gray-50/50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-slate-500" />
                  <h3 className="font-semibold text-slate-900">Education #{index + 1}</h3>
                </div>
                {data.education.length > 0 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Degree (e.g., Bachelor's, Master's)"
                  value={edu.degree || ''}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="School/University"
                  value={edu.school || ''}
                  onChange={(e) => updateEducation(index, 'school', e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Field of Study"
                  value={edu.field || ''}
                  onChange={(e) => updateEducation(index, 'field', e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Year"
                    value={edu.year || ''}
                    onChange={(e) => updateEducation(index, 'year', e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="GPA (Optional)"
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addEducation}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5 text-slate-500" />
            <span className="text-sm font-semibold text-slate-700">Add Education</span>
          </button>
        </div>
      </SectionCard>

      {/* Certifications Section */}
      <SectionCard title="Certifications" description="Add your professional certifications and credentials" icon={Award}>
        <div className="space-y-4">
          {data.certifications.map((cert, index) => (
            <div key={index} className="p-5 border border-gray-200 rounded-xl bg-gray-50/50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-slate-500" />
                  <h3 className="font-semibold text-slate-900">Certification #{index + 1}</h3>
                </div>
                {data.certifications.length > 0 && (
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Certification Name"
                  value={cert.name || ''}
                  onChange={(e) => updateCertification(index, 'name', e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Issuing Organization"
                  value={cert.issuer || ''}
                  onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  placeholder="Issue Date"
                  value={cert.date || ''}
                  onChange={(e) => updateCertification(index, 'date', e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  placeholder="Expiry Date (Optional)"
                  value={cert.expiry_date || ''}
                  onChange={(e) => updateCertification(index, 'expiry_date', e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Credential ID (Optional)"
                  value={cert.credential_id || ''}
                  onChange={(e) => updateCertification(index, 'credential_id', e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="url"
                  placeholder="Credential URL (Optional)"
                  value={cert.credential_url || ''}
                  onChange={(e) => updateCertification(index, 'credential_url', e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addCertification}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5 text-slate-500" />
            <span className="text-sm font-semibold text-slate-700">Add Certification</span>
          </button>
        </div>
      </SectionCard>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 border border-gray-200 rounded-xl text-sm text-slate-700 font-semibold transition-colors hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 text-white rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: theme.getAccentGradient(135),
            boxShadow: `0 4px 12px ${theme.accentPrimary}30`,
          }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}

