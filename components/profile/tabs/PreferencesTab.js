'use client';

import { useState, useEffect } from 'react';
import SectionCard from '../SectionCard';
import ToggleCard from '../ToggleCard';
import GenderSelect from '../GenderSelect';
import RaceSelect from '../RaceSelect';
import EthnicitySelect from '../EthnicitySelect';
import DisabilitySelect from '../DisabilitySelect';
import VeteranSelect from '../VeteranSelect';
import Input from '@/components/ui/Input';
import { Plane } from 'lucide-react';
import { theme } from '@/utils/theme';
import toast from 'react-hot-toast';

export default function PreferencesTab({ userId }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    relocation: false,
    experience: 0,
    gender: '',
    gender_id: null,
    ethnicity: '',
    ethnicity_id: null,
    race: '',
    race_id: null,
    disability_id: null,
    disability: '',
    veteran_disclosure_id: null,
    veteran: '',
  });

  useEffect(() => {
    loadData();
  }, [userId]);

  const loadData = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${userId}/profile/preferences`);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        toast.error(result.error || 'Failed to load preferences');
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
      toast.error('Failed to load preferences');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;
    
    setSaving(true);
    try {
      // Always fetch IDs for gender, ethnicity, race from master tables based on text values
      // This ensures we get the correct ID even when the user changes the selection
      // Handle "Decline to state" as null
      const isDeclineToState = (value) => !value || value === '' || value.toLowerCase() === 'decline to state';
      
      const lookupPromises = [];
      
      if (data.gender && !isDeclineToState(data.gender)) {
        lookupPromises.push(
          fetch(`/api/master-tables/gender?text=${encodeURIComponent(data.gender)}`)
            .then(res => res.json())
            .then(result => ({ type: 'gender', result }))
            .catch(() => ({ type: 'gender', result: { success: false } }))
        );
      } else {
        lookupPromises.push(Promise.resolve({ type: 'gender', result: { success: false, id: null } }));
      }
      
      if (data.ethnicity && !isDeclineToState(data.ethnicity)) {
        lookupPromises.push(
          fetch(`/api/master-tables/ethnicity?text=${encodeURIComponent(data.ethnicity)}`)
            .then(res => res.json())
            .then(result => ({ type: 'ethnicity', result }))
            .catch(() => ({ type: 'ethnicity', result: { success: false } }))
        );
      } else {
        lookupPromises.push(Promise.resolve({ type: 'ethnicity', result: { success: false, id: null } }));
      }
      
      if (data.race && !isDeclineToState(data.race)) {
        lookupPromises.push(
          fetch(`/api/master-tables/race?text=${encodeURIComponent(data.race)}`)
            .then(res => res.json())
            .then(result => ({ type: 'race', result }))
            .catch(() => ({ type: 'race', result: { success: false } }))
        );
      } else {
        lookupPromises.push(Promise.resolve({ type: 'race', result: { success: false, id: null } }));
      }

      const lookupResults = await Promise.all(lookupPromises);
      
      // Extract IDs from lookup results
      const genderLookup = lookupResults.find(r => r.type === 'gender');
      const ethnicityLookup = lookupResults.find(r => r.type === 'ethnicity');
      const raceLookup = lookupResults.find(r => r.type === 'race');

      // If lookup succeeded, use the ID; if "Decline to state" or empty, use null; otherwise fallback to existing ID
      const genderId = genderLookup?.result?.success 
        ? genderLookup.result.id 
        : (isDeclineToState(data.gender) ? null : (data.gender_id || null));
      const ethnicityId = ethnicityLookup?.result?.success 
        ? ethnicityLookup.result.id 
        : (isDeclineToState(data.ethnicity) ? null : (data.ethnicity_id || null));
      const raceId = raceLookup?.result?.success 
        ? raceLookup.result.id 
        : (isDeclineToState(data.race) ? null : (data.race_id || null));

      const response = await fetch(`/api/users/${userId}/profile/preferences`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          relocation: data.relocation,
          experience: data.experience,
          gender_id: genderId,
          ethnicity_id: ethnicityId,
          race_id: raceId,
          disability_id: data.disability_id,
          veteran_disclosure_id: data.veteran_disclosure_id,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success('Preferences updated successfully!');
        // Reload data to get updated values
        loadData();
      } else {
        toast.error(result.error || 'Failed to update preferences');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error('Failed to update preferences');
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
      {/* Career Preferences */}
      <SectionCard title="Career Preferences" description="Help us match you with the right opportunities">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Input
            label="Years of Experience"
            type="number"
            value={data.experience}
            onChange={(e) => updateField('experience', parseInt(e.target.value) || 0)}
            placeholder="e.g., 5"
          />
          <ToggleCard
            label="Willing to relocate"
            icon={Plane}
            value={data.relocation}
            onChange={(v) => updateField('relocation', v)}
          />
        </div>
      </SectionCard>

      {/* Diversity & Inclusion */}
      <SectionCard 
        title="Diversity & Inclusion" 
        description={
          <div>
            <p className="text-sm text-slate-600 mb-1">Optional information to help employers meet diversity goals</p>
            <p className="text-xs text-slate-500 italic">By continuing you agree to the definitions set by the U.S. EEOC</p>
          </div>
        }
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              What is your ethnicity?
            </label>
            <EthnicitySelect
              value={data.ethnicity}
              onChange={(value) => updateField('ethnicity', value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Do you have a disability?
            </label>
            <DisabilitySelect
              value={data.disability_id}
              onChange={(value) => updateField('disability_id', value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Are you a veteran?
            </label>
            <VeteranSelect
              value={data.veteran_disclosure_id}
              onChange={(value) => updateField('veteran_disclosure_id', value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              What is your gender?
            </label>
            <GenderSelect
              value={data.gender}
              onChange={(value) => updateField('gender', value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              What is your race?
            </label>
            <RaceSelect
              value={data.race}
              onChange={(value) => updateField('race', value)}
            />
          </div>
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

