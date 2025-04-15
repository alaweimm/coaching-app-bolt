import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Search,
  Plus,
  Calendar,
  FileText,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  FileCheck,
  Edit2,
  Trash2,
  Download,
  X,
  Save,
  AlertCircle,
  Scale,
  Target,
  Activity
} from 'lucide-react';
import { useClientStore } from '../store/clientStore';
import { calculateTDEE } from '../utils/calculations';

const ClientModule = () => {
  const { clients, addClient, updateClient, deleteClient } = useClientStore();
  const [activeTab, setActiveTab] = useState<'list' | 'calendar' | 'reports'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingClient, setEditingClient] = useState<Partial<Client> | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize with default client if none exists
  useEffect(() => {
    if (clients.length === 0) {
      const defaultClient = {
        name: "Meshal Alawein",
        email: "meshal@example.com",
        phone: "+1234567890",
        address: "123 Main St",
        startDate: new Date().toISOString().split('T')[0],
        status: 'active' as const,
        paymentStatus: 'paid' as const,
        notes: '',
        startWeight: 85.73,
        currentWeight: 84.5,
        goalWeight: 80,
        age: 30,
        height: 176,
        activityLevel: 'moderate' as const,
        goal: 'fat_loss' as const
      };
      
      try {
        addClient(defaultClient);
      } catch (err) {
        setError('Failed to initialize default client');
        console.error('Client initialization error:', err);
      }
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleNewClient = () => {
    setEditingClient({
      name: '',
      email: '',
      phone: '',
      address: '',
      startDate: new Date().toISOString().split('T')[0],
      status: 'active',
      paymentStatus: 'pending',
      notes: '',
      startWeight: 0,
      currentWeight: 0,
      goalWeight: 0,
      age: 25,
      height: 170,
      activityLevel: 'moderate',
      goal: 'maintenance'
    });
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
  };

  const handleSaveClient = () => {
    if (!editingClient) return;

    try {
      if ('id' in editingClient) {
        updateClient(editingClient as Client);
      } else {
        addClient(editingClient);
      }
      setEditingClient(null);
      setError(null);
    } catch (err) {
      setError('Failed to save client');
      console.error('Save client error:', err);
    }
  };

  const handleDeleteClient = (clientId: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      try {
        deleteClient(clientId);
        setError(null);
      } catch (err) {
        setError('Failed to delete client');
        console.error('Delete client error:', err);
      }
    }
  };

  const handleInputChange = (field: keyof Client, value: any) => {
    if (editingClient) {
      setEditingClient({
        ...editingClient,
        [field]: value
      });
    }
  };

  const calculateClientTDEE = (client: Client) => {
    return calculateTDEE(
      client.currentWeight,
      client.height,
      client.age,
      client.activityLevel
    );
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <h3 className="text-red-800 font-medium">Error</h3>
        </div>
        <p className="mt-2 text-red-700">{error}</p>
        <button
          onClick={() => setError(null)}
          className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
        >
          Dismiss
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleNewClient}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Client
          </button>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'list', label: 'Client List', icon: User },
            { id: 'calendar', label: 'Calendar', icon: Calendar },
            { id: 'reports', label: 'Reports', icon: FileText },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <Icon className={`
                w-5 h-5 mr-2
                ${activeTab === id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}
              `} />
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        {activeTab === 'list' && (
          <div className="p-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Appointment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map(client => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {client.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {client.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        client.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.nextAppointment
                        ? format(new Date(client.nextAppointment), 'MMM d, yyyy h:mm a')
                        : 'No upcoming appointments'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        client.paymentStatus === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : client.paymentStatus === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {client.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditClient(client)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteClient(client.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Appointments Calendar</h2>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </button>
            </div>
            <p className="text-gray-500">Calendar view coming soon...</p>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Reports & Analytics</h2>
              <div className="flex space-x-4">
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </button>
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Excel
                </button>
              </div>
            </div>
            <p className="text-gray-500">Reports view coming soon...</p>
          </div>
        )}
      </div>

      {editingClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {'id' in editingClient ? 'Edit Client' : 'New Client'}
                </h2>
                <button
                  onClick={() => setEditingClient(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editingClient.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={editingClient.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={editingClient.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={editingClient.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={editingClient.status}
                      onChange={(e) => handleInputChange('status', e.target.value as 'active' | 'inactive')}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Status
                    </label>
                    <select
                      value={editingClient.paymentStatus}
                      onChange={(e) => handleInputChange('paymentStatus', e.target.value as 'paid' | 'pending' | 'overdue')}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      value={editingClient.age}
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={editingClient.height}
                      onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Activity Level
                    </label>
                    <select
                      value={editingClient.activityLevel}
                      onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="sedentary">Sedentary</option>
                      <option value="light">Light Activity</option>
                      <option value="moderate">Moderate Activity</option>
                      <option value="very">Very Active</option>
                      <option value="extra">Extra Active</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Goal
                    </label>
                    <select
                      value={editingClient.goal}
                      onChange={(e) => handleInputChange('goal', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="fat_loss">Fat Loss</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="muscle_gain">Muscle Gain</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={editingClient.startWeight}
                      onChange={(e) => handleInputChange('startWeight', parseFloat(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={editingClient.currentWeight}
                      onChange={(e) => handleInputChange('currentWeight', parseFloat(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Goal Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={editingClient.goalWeight}
                      onChange={(e) => handleInputChange('goalWeight', parseFloat(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    rows={4}
                    value={editingClient.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add any additional notes about the client..."
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setEditingClient(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveClient}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientModule;