import { useState, useEffect } from 'react';
import { useClientStore } from '../store/clientStore';
import { useTrackingStore } from '../store/trackingStore';
import { generateWorkoutRecommendation } from '../services/ai/workoutRecommendations';
import type { WorkoutRecommendation } from '../types/workout.types';

export function useWorkoutRecommendations() {
  const { getSelectedClient } = useClientStore();
  const { dailyLogs } = useTrackingStore();
  const [recommendation, setRecommendation] = useState<WorkoutRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const client = getSelectedClient();
    if (!client) return;

    setLoading(true);
    setError(null);

    try {
      // Get recent metrics from daily logs
      const recentLogs = Object.values(dailyLogs)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 7);

      const averageMetrics = {
        sleep: recentLogs.reduce((sum, log) => sum + (log.sleep?.duration || 0), 0) / recentLogs.length,
        stress: recentLogs.reduce((sum, log) => sum + (log.health?.stress || 0), 0) / recentLogs.length,
        soreness: recentLogs.reduce((sum, log) => sum + (log.health?.soreness || 0), 0) / recentLogs.length,
        energy: recentLogs.reduce((sum, log) => sum + (log.health?.energy || 0), 0) / recentLogs.length,
      };

      const workoutRec = generateWorkoutRecommendation(
        client,
        [], // Exercise history would come from workout logs
        averageMetrics
      );

      setRecommendation(workoutRec);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate recommendation');
    } finally {
      setLoading(false);
    }
  }, [getSelectedClient, dailyLogs]);

  return { recommendation, loading, error };
}