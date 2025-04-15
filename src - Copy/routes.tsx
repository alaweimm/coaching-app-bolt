import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { WeeklyPlanning } from './components/weekly-planning/WeeklyPlanning';
import Dashboard from './features/dashboard/Dashboard';
import Nutrition from './features/nutrition/Nutrition';
import Workouts from './features/workouts/Workouts';
import Health from './features/health/Health';
import PEDModule from './components/PEDModule';
import Supplements from './features/supplements/Supplements';
import Analytics from './features/analytics/Analytics';
import { FitnessProgram } from './features/fitness/FitnessProgram';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/weekly" element={<WeeklyPlanning />} />
        <Route path="/nutrition/*" element={<Nutrition />} />
        <Route path="/workouts/*" element={<Workouts />} />
        <Route path="/health/*" element={<Health />} />
        <Route path="/ped" element={<PEDModule />} />
        <Route path="/supplements/*" element={<Supplements />} />
        <Route path="/analytics/*" element={<Analytics />} />
        <Route path="/program" element={<FitnessProgram />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}