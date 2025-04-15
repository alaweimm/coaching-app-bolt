import React from 'react';
import { useWorkoutStore } from '../store/workoutStore';
import { PixelCard } from '../../../components/ui/PixelCard';
import { PixelButton } from '../../../components/ui/PixelButton';
import { Dumbbell, Users, Brain } from 'lucide-react';
import type { WorkoutTemplate } from '../types/workout.types';

const DEFAULT_TEMPLATES: WorkoutTemplate[] = [
  {
    id: 'full-body-1',
    name: 'Full Body Workout A',
    type: 'full_body',
    description: 'Complete full body workout focusing on compound movements',
    exercises: [
      {
        exercise: {
          id: 'squat',
          name: 'Barbell Squat',
          type: 'strength',
          muscleGroups: ['legs'],
          equipment: ['barbell', 'rack'],
          description: 'Compound lower body exercise',
          createdAt: '',
          updatedAt: '',
        },
        defaultSets: 4,
        defaultReps: 8,
        restPeriod: 120,
      },
      // Add more exercises...
    ],
    estimatedDuration: 60,
    difficulty: 'intermediate',
    tags: ['strength', 'compound', 'full-body'],
    createdAt: '',
    updatedAt: '',
  },
  // Add more templates...
];

export function WorkoutTemplates() {
  const { templates, addTemplate } = useWorkoutStore();

  const handleUseTemplate = (template: WorkoutTemplate) => {
    // Implementation for using template
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PixelCard className="col-span-1 md:col-span-3">
          <h2 className="text-xl font-semibold mb-6">Workout Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Full Body Section */}
            <div>
              <div className="flex items-center mb-4">
                <Dumbbell className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="font-medium">Full Body</h3>
              </div>
              <div className="space-y-4">
                {DEFAULT_TEMPLATES
                  .filter(t => t.type === 'full_body')
                  .map(template => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onUse={handleUseTemplate}
                    />
                  ))}
              </div>
            </div>

            {/* Upper/Lower Section */}
            <div>
              <div className="flex items-center mb-4">
                <Users className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="font-medium">Upper/Lower Split</h3>
              </div>
              <div className="space-y-4">
                {DEFAULT_TEMPLATES
                  .filter(t => t.type === 'upper_lower')
                  .map(template => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onUse={handleUseTemplate}
                    />
                  ))}
              </div>
            </div>

            {/* Push/Pull/Legs Section */}
            <div>
              <div className="flex items-center mb-4">
                <Brain className="w-5 h-5 text-purple-500 mr-2" />
                <h3 className="font-medium">Push/Pull/Legs</h3>
              </div>
              <div className="space-y-4">
                {DEFAULT_TEMPLATES
                  .filter(t => t.type === 'push_pull_legs')
                  .map(template => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onUse={handleUseTemplate}
                    />
                  ))}
              </div>
            </div>
          </div>
        </PixelCard>
      </div>
    </div>
  );
}

interface TemplateCardProps {
  template: WorkoutTemplate;
  onUse: (template: WorkoutTemplate) => void;
}

function TemplateCard({ template, onUse }: TemplateCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50">
      <h4 className="font-medium mb-2">{template.name}</h4>
      <p className="text-sm text-gray-500 mb-4">{template.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          {template.estimatedDuration} min
        </div>
        <PixelButton
          variant="primary"
          size="sm"
          onClick={() => onUse(template)}
        >
          Use Template
        </PixelButton>
      </div>
    </div>
  );
}