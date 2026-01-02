'use client';

import { useState, useEffect } from 'react';
import SectionCard from '../SectionCard';
import { Plus, X, Briefcase, FolderKanban } from 'lucide-react';
import { theme } from '@/utils/theme';
import toast from 'react-hot-toast';

export default function WorkExperienceProjectsTab({ userId }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [workExperience, setWorkExperience] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadData();
  }, [userId]);

  const loadData = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/users/${userId}/profile/work-projects`);
      const result = await response.json();

      if (result.success) {
        setWorkExperience(result.data.work_experience || []);
        setProjects(result.data.projects || []);
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

  const addExperience = () => {
    setWorkExperience([...workExperience, {
      title: '',
      company: '',
      location: '',
      start_date: '',
      end_date: '',
      current: false,
      description: '',
    }]);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...workExperience];
    updated[index] = { ...updated[index], [field]: value };
    setWorkExperience(updated);
  };

  const removeExperience = (index) => {
    setWorkExperience(workExperience.filter((_, i) => i !== index));
  };

  const addProject = () => {
    setProjects([...projects, {
      name: '',
      description: '',
      technologies: [],
      url: '',
      start_date: '',
      end_date: '',
    }]);
  };

  const updateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const addTechnology = (index, tech) => {
    const updated = [...projects];
    if (!updated[index].technologies) updated[index].technologies = [];
    if (tech && !updated[index].technologies.includes(tech)) {
      updated[index].technologies.push(tech);
    }
    setProjects(updated);
  };

  const removeTechnology = (index, techIndex) => {
    const updated = [...projects];
    updated[index].technologies = updated[index].technologies.filter((_, i) => i !== techIndex);
    setProjects(updated);
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/users/${userId}/profile/work-projects`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          work_experience: workExperience,
          projects: projects,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Work experience and projects updated successfully!');
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
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Work Experience Section */}
      <SectionCard
        title="Work Experience"
        description="Add your professional work experience"
        icon={Briefcase}
      >
        <div className="space-y-4">
          {workExperience.map((exp, index) => (
            <div key={index} className="p-5 border border-gray-200 rounded-xl bg-gray-50/50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-slate-500" />
                  <h3 className="font-semibold text-slate-900">Experience #{index + 1}</h3>
                </div>
                {workExperience.length > 0 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={exp.title || ''}
                  onChange={(e) => updateExperience(index, 'title', e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company || ''}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={exp.location || ''}
                  onChange={(e) => updateExperience(index, 'location', e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={exp.start_date || ''}
                    onChange={(e) => updateExperience(index, 'start_date', e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={exp.end_date || ''}
                    onChange={(e) => updateExperience(index, 'end_date', e.target.value)}
                    disabled={exp.current}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exp.current || false}
                    onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Currently working here</span>
                </label>
                <textarea
                  placeholder="Job Description"
                  value={exp.description || ''}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  rows={3}
                  className="md:col-span-2 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addExperience}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5 text-slate-500" />
            <span className="text-sm font-semibold text-slate-700">Add Work Experience</span>
          </button>
        </div>
      </SectionCard>

      {/* Projects Section */}
      <SectionCard
        title="Projects"
        description="Showcase your projects and achievements"
        icon={FolderKanban}
      >
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="p-5 border border-gray-200 rounded-xl bg-gray-50/50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-slate-500" />
                  <h3 className="font-semibold text-slate-900">Project #{index + 1}</h3>
                </div>
                {projects.length > 0 && (
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={project.name || ''}
                  onChange={(e) => updateProject(index, 'name', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Project Description"
                  value={project.description || ''}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <input
                  type="url"
                  placeholder="Project URL (Optional)"
                  value={project.url || ''}
                  onChange={(e) => updateProject(index, 'url', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-4">
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={project.start_date || ''}
                    onChange={(e) => updateProject(index, 'start_date', e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={project.end_date || ''}
                    onChange={(e) => updateProject(index, 'end_date', e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Technologies Used
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add technology (press Enter)"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTechnology(index, e.target.value.trim());
                          e.target.value = '';
                        }
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm border font-medium"
                          style={{
                            background: `${theme.accentPrimary}08`,
                            color: theme.accentPrimary,
                            borderColor: `${theme.accentPrimary}25`,
                          }}
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTechnology(index, techIndex)}
                            className="hover:bg-red-100 rounded p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addProject}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5 text-slate-500" />
            <span className="text-sm font-semibold text-slate-700">Add Project</span>
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

