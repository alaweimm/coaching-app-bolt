import React from 'react';
import { Brain, AlertTriangle, Activity, Droplets } from 'lucide-react';
import { useWorkoutRecommendations } from '../../../hooks/useWorkoutRecommendations';
import { PixelCard } from '../../../components/ui/PixelCard';
import { PixelButton } from '../../../components/ui/PixelButton';
import { PixelProgress } from '../../../components/ui/PixelProgress';

export function WorkoutRecommendations() {
  const { recommendation, loading, error } = useWorkoutRecommendations();

  if (loading) {
    return (
      <PixelCard>
        <div className="flex items-center justify-center h-48">
          <Brain className="w-8 h-8 text-blue-500 animate-pulse" />
        </div>
      </PixelCard>
    );
  }

  if (error) {
    return (
      <PixelCard>
        <div className="flex items-center text-red-600">
          <AlertTriangle className="w-5 h-5 mr-2" />
          <p>{error}</p>
        </div>
      </PixelCard>
    );
  }

  if (!recommendation) return null;

  return (
    <PixelCard>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Brain className="w-6 h-6 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold">AI Workout Recommendation</h2>
        </div>
        <PixelButton
          variant="primary"
          onClick={() => {/* Handle using recommendation */}}
        >
          Use This Workout
        </PixelButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-medium mb-2">Recommended Workout</h3>
          <p className="text-gray-600 mb-4">{recommendation.template.description}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Activity className="w-4 h-4 mr-1" />
            <span>Intensity: {recommendation.intensity}</span>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Recovery Guidelines</h3>
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Rest Days</span>
                <span>{recommendation.recoveryGuidelines.restDays} days</span>
              </div>
              <PixelProgress
                value={recommendation.recoveryGuidelines.restDays}
                max={7}
                variant="warning"
                size="sm"
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Sleep Target</span>
                <span>{recommendation.recoveryGuidelines.sleepRecommendation} hours</span>
              </div>
              <PixelProgress
                value={recommendation.recoveryGuidelines.sleepRecommendation}
                max={10}
                variant="success"
                size="sm"
              />
            </div>
            <div className="flex items-center text-sm">
              <Droplets className="w-4 h-4 mr-1 text-blue-500" />
              <span>
                Water: {recommendation.recoveryGuidelines.hydrationGoal.toFixed(1)}L/day
              </span>
            </div>
          </div>
        </div>
      </div>

      {recommendation.modifications.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">Suggested Modifications</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {recommendation.modifications.map((mod, index) => (
              <li key={index}>{mod}</li>
            ))}
          </ul>
        </div>
      )}
    </PixelCard>
  );
}