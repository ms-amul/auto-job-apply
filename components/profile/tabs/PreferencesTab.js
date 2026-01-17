'use client';

import { theme } from '@/utils/theme';
import { Plane, Home, Briefcase, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DisabilitySelect from '../DisabilitySelect';
import EthnicitySelect from '../EthnicitySelect';
import GenderSelect from '../GenderSelect';
import RaceSelect from '../RaceSelect';
import SectionCard from '../SectionCard';
import VeteranSelect from '../VeteranSelect';
import MinPayRate from '../../ui/MinPayRate';
import { CardLoader } from '@/components/ui/Loader';

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
    min_payrate: 25,
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
          min_payrate: data.min_payrate,
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
      <CardLoader text='Loading preferences...' />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Career Preferences */}
      <SectionCard title="Career Preferences" description="Help us match you with the right opportunities" icon={Briefcase}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Years of Experience */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Years of Experience
            </label>
            <div className="relative">
              <input
                type="number"
                value={data.experience}
                onChange={(e) => updateField('experience', parseInt(e.target.value) || 0)}
                placeholder="e.g., 5"
                min="0"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                style={{
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                }}
              />
            </div>
          </div>

          {/* Relocation Toggle */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Willing to relocate
            </label>
            <div className="flex items-center gap-3">
              <div
                className={`relative flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-500 ease-out ${data.relocation
                  ? 'bg-gradient-to-br from-emerald-50 to-emerald-100'
                  : 'bg-gradient-to-br from-red-50 to-red-100'
                  }`}
              >
                {/* Animated icon container with smooth transitions */}
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  {/* Plane icon for Yes - slides in from top */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${data.relocation
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 -translate-y-8 scale-75'
                      }`}
                  >
                    <Plane className="w-7 h-7 text-emerald-600" />
                  </div>

                  {/* Home icon for No - slides in from bottom */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${!data.relocation
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-8 scale-75'
                      }`}
                  >
                    <Home className="w-7 h-7 text-red-600" />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => updateField('relocation', true)}
                    className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 border transform active:scale-95 ${data.relocation
                      ? 'text-white bg-emerald-600 border-emerald-600'
                      : 'bg-white border-gray-200 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50'
                      }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('relocation', false)}
                    className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 border transform active:scale-95 ${!data.relocation
                      ? 'text-white bg-red-600 border-rose-600'
                      : 'bg-white border-gray-200 text-slate-600 hover:border-rose-300 hover:bg-rose-50'
                      }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Minimum Payrate Slider */}
          <div className="md:col-span-2 border-t border-slate-100">
            <MinPayRate
              value={data.min_payrate}
              onChange={(value) => updateField('min_payrate', value)}
            />
          </div>
        </div>
      </SectionCard>

      {/* Diversity & Inclusion */}
      <SectionCard
        title="Diversity & Inclusion"
        icon={Globe}
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

