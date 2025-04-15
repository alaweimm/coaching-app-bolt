import React from 'react';
import { User, Mail, Phone, Calendar, Scale, Target } from 'lucide-react';

const ClientProfile = () => {
  const clientData = {
    name: "Meshal Alawein",
    email: "meshal@example.com",
    phone: "+1234567890",
    age: 35,
    height: 176,
    startWeight: 85.73,
    currentWeight: 84.5,
    goalWeight: 80.0,
    startDate: "14 April 2024",
    checkInDay: "Monday"
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Client Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{clientData.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{clientData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{clientData.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Physical Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Physical Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-medium">{clientData.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Height</p>
                    <p className="font-medium">{clientData.height} cm</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Start Weight</p>
                    <p className="font-medium">{clientData.startWeight} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Weight</p>
                    <p className="font-medium">{clientData.currentWeight} kg</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Goal Weight</p>
                  <p className="font-medium">{clientData.goalWeight} kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;