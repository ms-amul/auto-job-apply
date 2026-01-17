'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import SectionCard from '../SectionCard';
import { User, Mail, Phone, MapPin, UserCircle, FileText } from 'lucide-react';
import { theme } from '@/utils/theme';
import toast from 'react-hot-toast';
import { CardLoader } from '@/components/ui/Loader';

export default function GeneralTab({ userId, onUpdate }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    home: '',
    work: '',
    work_ext: '',
    address: '',
    city: '',
    country: '',
    zipcode: '',
    birth_date: null,
    over_18_age: true,
    professional_summary: '',
  });

  useEffect(() => {
    loadData();
  }, [userId]);

  const loadData = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/users/${userId}/profile/general`);
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        toast.error(result.error || 'Failed to load general profile');
      }
    } catch (error) {
      console.error('Error loading general profile:', error);
      toast.error('Failed to load general profile');
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
      const response = await fetch(`/api/users/${userId}/profile/general`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('General profile updated successfully!');
        if (onUpdate) onUpdate();
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error saving general profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <CardLoader text='Loading general profile...' />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInfoSection data={data} updateField={updateField} />
      <LocationSection data={data} updateField={updateField} />
      <ProfessionalSummarySection data={data} updateField={updateField} />

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

function BasicInfoSection({ data, updateField }) {
  return (
    <SectionCard title="Basic Information" description="Your core details visible to recruiters" icon={UserCircle}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Input
          label="First Name"
          type="text"
          value={data.first_name}
          onChange={(e) => updateField('first_name', e.target.value)}
          icon={<User className="w-5 h-5" />}
          required
        />
        <Input
          label="Last Name"
          type="text"
          value={data.last_name}
          onChange={(e) => updateField('last_name', e.target.value)}
          icon={<User className="w-5 h-5" />}
          required
        />
        <Input
          label="Email Address"
          type="email"
          value={data.email}
          onChange={(e) => updateField('email', e.target.value)}
          icon={<Mail className="w-5 h-5" />}
          required
          disabled
        />
        <Input
          label="Mobile Phone"
          type="tel"
          value={data.mobile}
          onChange={(e) => updateField('mobile', e.target.value)}
          icon={<Phone className="w-5 h-5" />}
          placeholder="e.g., +1 (555) 123-4567"
        />
        <Input
          label="Home Phone"
          type="tel"
          value={data.home}
          onChange={(e) => updateField('home', e.target.value)}
          icon={<Phone className="w-5 h-5" />}
          placeholder="Optional"
        />
        <Input
          label="Work Phone"
          type="tel"
          value={data.work}
          onChange={(e) => updateField('work', e.target.value)}
          icon={<Phone className="w-5 h-5" />}
          placeholder="Optional"
        />
        <Input
          label="Work Extension"
          type="text"
          value={data.work_ext}
          onChange={(e) => updateField('work_ext', e.target.value)}
          placeholder="Optional"
        />
        <Input
          label="Birth Date"
          type="date"
          value={data.birth_date || ''}
          onChange={(e) => updateField('birth_date', e.target.value)}
          icon={<User className="w-5 h-5" />}
        />
      </div>
    </SectionCard>
  );
}

function LocationSection({ data, updateField }) {
  return (
    <SectionCard title="Location Information" description="Your address and location details" icon={MapPin}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="md:col-span-2">
          <Input
            label="Address"
            type="text"
            value={data.address}
            onChange={(e) => updateField('address', e.target.value)}
            icon={<MapPin className="w-5 h-5" />}
            placeholder="Street address"
          />
        </div>
        <Input
          label="City"
          type="text"
          value={data.city}
          onChange={(e) => updateField('city', e.target.value)}
          icon={<MapPin className="w-5 h-5" />}
          placeholder="e.g., San Francisco"
        />
        <Input
          label="Country"
          type="text"
          value={data.country}
          onChange={(e) => updateField('country', e.target.value)}
          icon={<MapPin className="w-5 h-5" />}
          placeholder="e.g., United States"
        />
        <Input
          label="ZIP Code"
          type="text"
          required
          value={data.zipcode}
          onChange={(e) => updateField('zipcode', e.target.value)}
          icon={<MapPin className="w-5 h-5" />}
          placeholder="e.g., 94102"
        />
      </div>
    </SectionCard>
  );
}

function ProfessionalSummarySection({ data, updateField }) {
  return (
    <SectionCard title="Professional Summary" description="Tell us about your experience and goals" icon={FileText}>
      <textarea
        value={data.professional_summary}
        onChange={(e) => updateField('professional_summary', e.target.value)}
        rows={6}
        placeholder="Tell us about your experience, skills, and what you're looking for..."
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-900 text-sm"
      />
    </SectionCard>
  );
}


