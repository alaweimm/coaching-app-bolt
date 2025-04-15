import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface ComplianceOverviewProps {
  compliance: {
    training: number;
    nutrition: number;
    cardio: number;
  };
}

export const ComplianceOverview: React.FC<ComplianceOverviewProps> = ({ compliance }) => {
  const getComplianceColor = (rate: number) => {
    if (rate >= 90) return 'bg-green-500';
    if (rate >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getComplianceIcon = (rate: number) => {
    if (rate >= 75) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Program Compliance</h2>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              {getComplianceIcon(compliance.training)}
              <span className="ml-2 font-medium">Training</span>
            </div>
            <span className="font-medium">{compliance.training}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${getComplianceColor(compliance.training)}`}
              style={{ width: `${compliance.training}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              {getComplianceIcon(compliance.nutrition)}
              <span className="ml-2 font-medium">Nutrition</span>
            </div>
            <span className="font-medium">{compliance.nutrition}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${getComplianceColor(compliance.nutrition)}`}
              style={{ width: `${compliance.nutrition}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              {getComplianceIcon(compliance.cardio)}
              <span className="ml-2 font-medium">Cardio</span>
            </div>
            <span className="font-medium">{compliance.cardio}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${getComplianceColor(compliance.cardio)}`}
              style={{ width: `${compliance.cardio}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};