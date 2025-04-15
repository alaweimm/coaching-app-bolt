import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { PixelCard } from '../../../components/ui/PixelCard';
import { PixelButton } from '../../../components/ui/PixelButton';
import { PixelInput } from '../../../components/ui/PixelInput';
import { useWorkoutStore } from '../store/workoutStore';
import type { Exercise, MuscleGroup } from '../types/workout.types';

const muscleGroups: MuscleGroup[] = [
  'chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'full_body'
];

export default function ExerciseLibrary() {
  const { exercises, addExercise } = useWorkoutStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<MuscleGroup | 'all'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: '',
    type: 'strength' as const,
    muscleGroups: [] as MuscleGroup[],
    equipment: [] as string[],
    description: '',
  });

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscleGroup = selectedMuscleGroup === 'all' || exercise.muscleGroups.includes(selectedMuscleGroup as MuscleGroup);
    return matchesSearch && matchesMuscleGroup;
  });

  const handleAddExercise = () => {
    const exercise: Exercise = {
      id: crypto.randomUUID(),
      ...newExercise,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addExercise(exercise);
    setNewExercise({
      name: '',
      type: 'strength',
      muscleGroups: [],
      equipment: [],
      description: '',
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <PixelInput
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
          <select
            value={selectedMuscleGroup}
            onChange={(e) => setSelectedMuscleGroup(e.target.value as MuscleGroup | 'all')}
            className="rounded-lg border-gray-300"
          >
            <option value="all">All Muscle Groups</option>
            {muscleGroups.map(group => (
              <option key={group} value={group}>
                {group.charAt(0).toUpperCase() + group.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <PixelButton
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setShowAddForm(true)}
        >
          Add Exercise
        </PixelButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map(exercise => (
          <PixelCard key={exercise.id}>
            <h3 className="font-medium text-lg mb-2">{exercise.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{exercise.description}</p>
            <div className="flex flex-wrap gap-2">
              {exercise.muscleGroups.map(group => (
                <span
                  key={group}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {group}
                </span>
              ))}
            </div>
            <div className="mt-3 text-sm text-gray-500">
              Equipment: {exercise.equipment.join(', ')}
            </div>
          </PixelCard>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <PixelCard className="max-w-2xl w-full">
            <h2 className="text-xl font-semibold mb-6">Add New Exercise</h2>
            <div className="space-y-4">
              <PixelInput
                label="Exercise Name"
                value={newExercise.name}
                onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
              />

              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={newExercise.type}
                  onChange={(e) => setNewExercise({ ...newExercise, type: e.target.value as 'strength' | 'cardio' | 'flexibility' })}
                  className="w-full rounded-lg border-gray-300"
                >
                  <option value="strength">Strength</option>
                  <option value="cardio">Cardio</option>
                  <option value="flexibility">Flexibility</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Muscle Groups</label>
                <div className="flex flex-wrap gap-2">
                  {muscleGroups.map(group => (
                    <label key={group} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={newExercise.muscleGroups.includes(group)}
                        onChange={(e) => {
                          const updatedGroups = e.target.checked
                            ? [...newExercise.muscleGroups, group]
                            : newExercise.muscleGroups.filter(g => g !== group);
                          setNewExercise({ ...newExercise, muscleGroups: updatedGroups });
                        }}
                        className="rounded border-gray-300 text-blue-600"
                      />
                      <span className="ml-2 text-sm">{group}</span>
                    </label>
                  ))}
                </div>
              </div>

              <PixelInput
                label="Equipment (comma-separated)"
                value={newExercise.equipment.join(', ')}
                onChange={(e) => setNewExercise({
                  ...newExercise,
                  equipment: e.target.value.split(',').map(item => item.trim()).filter(Boolean)
                })}
              />

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newExercise.description}
                  onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
                  rows={4}
                  className="w-full rounded-lg border-gray-300"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <PixelButton
                  variant="secondary"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </PixelButton>
                <PixelButton
                  variant="primary"
                  onClick={handleAddExercise}
                  disabled={!newExercise.name || newExercise.muscleGroups.length === 0}
                >
                  Add Exercise
                </PixelButton>
              </div>
            </div>
          </PixelCard>
        </div>
      )}
    </div>
  );
}