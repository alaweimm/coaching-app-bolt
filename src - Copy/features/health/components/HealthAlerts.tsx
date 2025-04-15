import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface HealthAlertsProps {
  risk: {
    risk: 'low' | 'moderate' | 'high';
    factors: string[];
  };
}

export const HealthAlerts: React.FC<HealthAlertsProps> = ({ risk }) => {
  const alertStyles = {
    low: {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
    },
    moderate: {
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
    },
    high: {
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
    },
    default: {
      icon: AlertCircle,
      color: 'text-gray-600',
      bg: 'bg-gray-50',
      border: 'border-gray-200',
    },
  };

  const style = alertStyles[risk.risk] || alertStyles.default;
  const Icon = style.icon;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Health Status</h2>
      
      <div className={`${style.bg} ${style.border} border rounded-lg p-4 mb-4`}>
        <div className="flex items-center mb-2">
          <Icon className={`w-5 h-5 ${style.color} mr-2`} />
          <span className={`font-medium ${style.color}`}>
            {risk.risk === 'low' ? 'Healthy Status' : 
             risk.risk === 'moderate' ? 'Attention Needed' : 
             risk.risk === 'high' ? 'High Risk Status' :
             'Unknown Status'}
          </span>
        </div>
        <p className="text-gray-600">
          {risk.risk === 'low' ? 
            'Your health metrics are within normal ranges.' :
            'The following factors require attention:'}
        </p>
      </div>

      {risk.factors.length > 0 && (
        <div className="space-y-2">
          {risk.factors.map((factor, index) => (
            <div
              key={index}
              className="flex items-center text-gray-700 bg-gray-50 rounded-lg p-3"
            >
              <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
              {factor}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};