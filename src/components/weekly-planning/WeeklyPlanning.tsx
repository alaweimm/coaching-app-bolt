import React, { useState } from 'react';
import { startOfWeek, addDays, format, subWeeks, addWeeks } from 'date-fns';
import { ChevronLeft, ChevronRight, Lock, Unlock } from 'lucide-react';
import { useTrackingStore } from '../../store/trackingStore';
import { DailyTrackingCard } from './DailyTrackingCard';
import { WeeklySummary } from './WeeklySummary';
import type { DailyLog } from '../../types/tracking';

export const WeeklyPlanning = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [isLocked, setIsLocked] = useState(false);
  const { dailyLogs, addDailyLog, updateDailyLog } = useTrackingStore();

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handlePreviousWeek = () => {
    setCurrentWeek(prev => subWeeks(prev, 1));
    setIsLocked(true); // Past weeks are locked by default
  };

  const handleNextWeek = () => {
    const newWeek = addWeeks(currentWeek, 1);
    setCurrentWeek(newWeek);
    setIsLocked(false); // Future weeks are editable
  };

  const handleUpdateDay = (date: string, updates: Partial<DailyLog>) => {
    if (isLocked) return;

    const existingLog = dailyLogs[date];
    if (existingLog) {
      updateDailyLog(date, updates);
    } else {
      addDailyLog({
        id: crypto.randomUUID(),
        date,
        ...updates,
      } as DailyLog);
    }
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  // Calculate weekly summary from daily logs
  const calculateWeeklySummary = () => {
    const weekLogs = weekDays.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      return dailyLogs[dateStr];
    }).filter(Boolean);

    if (weekLogs.length === 0) {
      return {
        compliance: 0,
        avgMood: 0,
        avgSleep: 0,
        macroAdherence: 0,
      };
    }

    const totals = weekLogs.reduce((acc, log) => ({
      compliance: acc.compliance + (log.training?.completed ? 1 : 0),
      mood: acc.mood + (log.mood || 0),
      sleep: acc.sleep + (log.sleep?.duration || 0),
      macroAdherence: acc.macroAdherence + (log.macros?.compliance || 0),
    }), { compliance: 0, mood: 0, sleep: 0, macroAdherence: 0 });

    return {
      compliance: (totals.compliance / weekLogs.length) * 100,
      avgMood: totals.mood / weekLogs.length,
      avgSleep: totals.sleep / weekLogs.length,
      macroAdherence: totals.macroAdherence / weekLogs.length,
    };
  };

  const summary = calculateWeeklySummary();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Weekly Planning</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePreviousWeek}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Previous Week"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-medium">
            {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
          </span>
          <button
            onClick={handleNextWeek}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Next Week"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={toggleLock}
            className={`p-2 rounded-full ${
              isLocked 
                ? 'text-red-500 hover:bg-red-50' 
                : 'text-green-500 hover:bg-green-50'
            }`}
            title={isLocked ? 'Unlock Week' : 'Lock Week'}
          >
            {isLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <WeeklySummary summary={summary} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {weekDays.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd');
          return (
            <DailyTrackingCard
              key={dateStr}
              date={dateStr}
              entry={dailyLogs[dateStr] || {}}
              onUpdate={handleUpdateDay}
              isLocked={isLocked}
            />
          );
        })}
      </div>
    </div>
  );
};