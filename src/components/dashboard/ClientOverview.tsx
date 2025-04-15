import React from 'react';
import { User, Calendar, Scale, Target } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  startWeight: number;
  currentWeight: number;
  goalWeight: number;
  startDate: string;
}

interface ClientOverviewProps {
  client: Client;
}

const ClientOverview = ({ client }: ClientOverviewProps) => {
  const weightChange = (client.currentWeight - client.startWeight).toFixed(2);
  const progressPercentage = Math.round(
    ((client.startWeight - client.currentWeight) / 
    (client.startWeight - client.goalWeight)) * 100
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Client Overview</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <User className="w-5 h-5 text-blue-600 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{client.name}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-blue-600 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Started</p>
            <p className="font-medium">{client.startDate}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Scale className="w-5 h-5 text-blue-600 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Weight Progress</p>
            <div className="flex items-baseline space-x-2">
              <p className="font-medium">{client.currentWeight} kg</p>
              <span className={`text-sm ${parseFloat(weightChange) < 0 ? 'text-green-600' : 'text-red-600'}`}>
                {weightChange} kg
              </span>
            </div>
            <p className="text-sm text-gray-500">Started at {client.startWeight} kg</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Target className="w-5 h-5 text-blue-600 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Goal Progress</p>
            <p className="font-medium">{client.goalWeight} kg</p>
            <div className="mt-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{progressPercentage}% complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientOverview;