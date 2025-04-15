import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTrackingStore } from '../../../store/trackingStore';
import type { Supplement } from '../../../types/tracking';

export const SupplementForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { supplements, addSupplement, updateSupplement } = useTrackingStore();

  const supplement = id ? supplements.find(s => s.id === id) : undefined;

  const [formData, setFormData] = React.useState<Partial<Supplement>>(
    supplement || {
      name: '',
      category: 'supplement',
      phase: 'off',
      dosage: 0,
      unit: 'mg',
      frequency: 'daily',
      timing: 'morning',
      startDate: new Date().toISOString().split('T')[0],
      notes: '',
      status: 'planned',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (supplement) {
      updateSupplement(supplement.id, formData);
    } else {
      addSupplement({
        ...formData,
        id: crypto.randomUUID(),
      } as Supplement);
    }

    navigate('/supplements');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">
          {supplement ? 'Edit Supplement' : 'Add New Supplement'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-lg border-gray-300"
              >
                <option value="supplement">Supplement</option>
                <option value="compound">Compound</option>
                <option value="ancillary">Ancillary</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phase
              </label>
              <select
                name="phase"
                value={formData.phase}
                onChange={handleChange}
                required
                className="w-full rounded-lg border-gray-300"
              >
                <option value="off">Off</option>
                <option value="blast">Blast</option>
                <option value="cruise">Cruise</option>
                <option value="trt">TRT</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full rounded-lg border-gray-300"
              >
                <option value="planned">Planned</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dosage
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border-gray-300"
                />
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                  className="w-32 rounded-lg border-gray-300"
                >
                  <option value="mg">mg</option>
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="iu">IU</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frequency
              </label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                required
                className="w-full rounded-lg border-gray-300"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timing
              </label>
              <select
                name="timing"
                value={formData.timing}
                onChange={handleChange}
                required
                className="w-full rounded-lg border-gray-300"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="pre-workout">Pre-workout</option>
                <option value="post-workout">Post-workout</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full rounded-lg border-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg border-gray-300"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/supplements')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {supplement ? 'Update' : 'Add'} Supplement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};