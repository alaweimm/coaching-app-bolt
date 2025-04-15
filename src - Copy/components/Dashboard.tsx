import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { ChevronDown, Users, AlertCircle } from 'lucide-react';
import { useClientStore } from '../store/clientStore';
import ClientOverview from './dashboard/ClientOverview';
import ProgressMetrics from './dashboard/ProgressMetrics';
import WeeklyCompliance from './dashboard/WeeklyCompliance';
import NutritionOverview from './dashboard/NutritionOverview';
import TrainingOverview from './dashboard/TrainingOverview';
import HealthMetrics from './dashboard/HealthMetrics';

const Dashboard = () => {
  const { clients, selectedClientId, setSelectedClientId, getSelectedClient } = useClientStore();
  const [showClientSelector, setShowClientSelector] = useState(false);
  
  const selectedClient = getSelectedClient();

  if (clients.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Clients Found</h2>
          <p className="text-gray-600">Add your first client in the Clients tab to get started.</p>
        </div>
      </div>
    );
  }

  if (!selectedClient) {
    setSelectedClientId(clients[0].id);
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative">
          <button
            onClick={() => setShowClientSelector(!showClientSelector)}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
          >
            <Users className="w-5 h-5 text-gray-500" />
            <span className="font-medium">{selectedClient.name}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {showClientSelector && (
            <div className="absolute top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              {clients.map(client => (
                <button
                  key={client.id}
                  onClick={() => {
                    setSelectedClientId(client.id);
                    setShowClientSelector(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                >
                  <span className={`flex-1 ${client.id === selectedClient.id ? 'font-medium' : ''}`}>
                    {client.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Weekly Check-in
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ClientOverview client={selectedClient} />
        <ProgressMetrics client={selectedClient} />
        <WeeklyCompliance />
      </div>

      <Tabs defaultValue="nutrition" className="w-full">
        <TabsList>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
        </TabsList>
        <TabsContent value="nutrition">
          <NutritionOverview />
        </TabsContent>
        <TabsContent value="training">
          <TrainingOverview />
        </TabsContent>
        <TabsContent value="health">
          <HealthMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;