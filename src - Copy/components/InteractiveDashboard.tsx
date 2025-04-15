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
import {
  ChevronRight,
  ChevronDown,
  Info,
  Edit,
  ArrowDown,
  ArrowUp,
  Check,
  X
} from 'lucide-react';

interface ClientData {
  name: string;
  age: number;
  height: number;
  startWeight: number;
  goalWeight: number;
  checkInDay: string;
  weekOfCoaching: number;
  startDate: string;
  paymentDate: string;
}

interface ComplianceRates {
  nutrition: number;
  steps: number;
  cardio: number;
  overall: number;
}

interface MeasurementsData {
  name: string;
  initial: number;
  current: number;
  change: number;
}

interface WeeklyPlanData {
  day: string;
  weekday: string;
  training: string;
  nutrition: string;
  completed: boolean;
  cardioGoal: number;
  cardioActual: number;
  stepsGoal: number;
  stepsActual: number;
  sleep: number;
  mood: number;
}

const InteractiveDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentWeight, setCurrentWeight] = useState(84.5);
  const [complianceRates, setComplianceRates] = useState<ComplianceRates>({
    nutrition: 85,
    steps: 92,
    cardio: 93,
    overall: 90
  });

  // Sample client data
  const clientData: ClientData = {
    name: "Meshal Alawein",
    age: 35,
    height: 176,
    startWeight: 85.73,
    goalWeight: 80.0,
    checkInDay: "Monday",
    weekOfCoaching: 0,
    startDate: "14 April",
    paymentDate: "-"
  };

  // Calculate derived metrics
  const weightChange = (currentWeight - clientData.startWeight).toFixed(2);
  const progressPercentage = Math.round(
    ((clientData.startWeight - currentWeight) / 
    (clientData.startWeight - clientData.goalWeight)) * 100
  );

  // Nutrition protocol data
  const nutritionData = {
    trainingDays: 5,
    trainingProtein: 200,
    trainingFats: 70,
    trainingCarbs: 150,
    trainingCalories: 2030,
    restDays: 2,
    restProtein: 200,
    restFats: 70,
    restCarbs: 125,
    restCalories: 1930,
    weeklyCalories: 14010,
    weeklyDeficit: 2390,
  };

  // Weight tracking data
  const [weightData, setWeightData] = useState([
    { week: 0, weight: 85.73, goal: 80 },
    { week: 1, weight: 85.2, goal: 80 },
    { week: 2, weight: 84.8, goal: 80 },
    { week: 3, weight: currentWeight, goal: 80 }
  ]);

  // Measurement data
  const [measurementsData, setMeasurementsData] = useState<MeasurementsData[]>([
    { name: "WEIGHT (KG)", initial: 85.7, current: currentWeight, change: parseFloat((currentWeight - 85.7).toFixed(1)) },
    { name: "CHEST (CM)", initial: 105.0, current: 104.0, change: -1.0 },
    { name: "WAIST (CM)", initial: 90.0, current: 88.0, change: -2.0 },
    { name: "HIPS (CM)", initial: 98.0, current: 97.0, change: -1.0 }
  ]);

  // Weekly planner data
  const [weeklyPlanData, setWeeklyPlanData] = useState<WeeklyPlanData[]>([
    {
      day: "DAY 1",
      weekday: "MON",
      training: "PUSH",
      nutrition: "TRAINING",
      completed: true,
      cardioGoal: 60,
      cardioActual: 60,
      stepsGoal: 10000,
      stepsActual: 9800,
      sleep: 7.5,
      mood: 4
    },
    {
      day: "DAY 2",
      weekday: "TUE",
      training: "PULL",
      nutrition: "TRAINING",
      completed: true,
      cardioGoal: 60,
      cardioActual: 60,
      stepsGoal: 10000,
      stepsActual: 10200,
      sleep: 8,
      mood: 5
    },
    {
      day: "DAY 3",
      weekday: "WED",
      training: "LOWER B",
      nutrition: "TRAINING",
      completed: true,
      cardioGoal: 60,
      cardioActual: 60,
      stepsGoal: 10000,
      stepsActual: 9500,
      sleep: 7,
      mood: 4
    },
    {
      day: "DAY 4",
      weekday: "THU",
      training: "OFF",
      nutrition: "REST",
      completed: true,
      cardioGoal: 0,
      cardioActual: 0,
      stepsGoal: 10000,
      stepsActual: 10500,
      sleep: 8.5,
      mood: 5
    },
    {
      day: "DAY 5",
      weekday: "FRI",
      training: "UPPER",
      nutrition: "TRAINING",
      completed: false,
      cardioGoal: 60,
      cardioActual: 0,
      stepsGoal: 10000,
      stepsActual: 5000,
      sleep: 0,
      mood: 0
    },
    {
      day: "DAY 6",
      weekday: "SAT",
      training: "LOWER A",
      nutrition: "TRAINING",
      completed: false,
      cardioGoal: 60,
      cardioActual: 0,
      stepsGoal: 10000,
      stepsActual: 0,
      sleep: 0,
      mood: 0
    },
    {
      day: "DAY 7",
      weekday: "SUN",
      training: "OFF",
      nutrition: "REST",
      completed: false,
      cardioGoal: 0,
      cardioActual: 0,
      stepsGoal: 10000,
      stepsActual: 0,
      sleep: 0,
      mood: 0
    }
  ]);

  // Check-in form state
  const [checkInData, setCheckInData] = useState({
    weight: '',
    chest: '',
    waist: '',
    hips: '',
    dietAdherence: '',
    cardioMinutes: '',
    stepCount: '',
    notes: '',
    completed: false
  });

  // Handle check-in form submission
  const handleCheckInSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Update current weight
    const newWeight = parseFloat(checkInData.weight);
    setCurrentWeight(newWeight);

    // Update weight data array with new entry
    const newWeek = weightData.length;
    setWeightData([
      ...weightData,
      { week: newWeek, weight: newWeight, goal: 80 }
    ]);

    // Update measurements data
    const newMeasurements = measurementsData.map(item => {
      if (item.name === "WEIGHT (KG)") {
        return {
          ...item,
          current: newWeight,
          change: parseFloat((newWeight - item.initial).toFixed(1))
        };
      } else if (item.name === "CHEST (CM)" && checkInData.chest) {
        return {
          ...item,
          current: parseFloat(checkInData.chest),
          change: parseFloat((parseFloat(checkInData.chest) - item.initial).toFixed(1))
        };
      } else if (item.name === "WAIST (CM)" && checkInData.waist) {
        return {
          ...item,
          current: parseFloat(checkInData.waist),
          change: parseFloat((parseFloat(checkInData.waist) - item.initial).toFixed(1))
        };
      } else if (item.name === "HIPS (CM)" && checkInData.hips) {
        return {
          ...item,
          current: parseFloat(checkInData.hips),
          change: parseFloat((parseFloat(checkInData.hips) - item.initial).toFixed(1))
        };
      }
      return item;
    });
    setMeasurementsData(newMeasurements);

    // Update compliance rates
    const newDietAdherence = parseInt(checkInData.dietAdherence) || 0;
    setComplianceRates({
      ...complianceRates,
      nutrition: newDietAdherence,
      overall: Math.round((newDietAdherence + complianceRates.steps + complianceRates.cardio) / 3)
    });

    // Reset form
    setCheckInData({
      weight: '',
      chest: '',
      waist: '',
      hips: '',
      dietAdherence: '',
      cardioMinutes: '',
      stepCount: '',
      notes: '',
      completed: true
    });

    // Switch to dashboard view
    setActiveTab('dashboard');
  };

  // Handle check-in form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCheckInData({
      ...checkInData,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">Fitness Coaching Dashboard</h1>
          
          <div className="mt-4 md:mt-0">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  activeTab === 'checkin'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('checkin')}
              >
                Weekly Check-in
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Client Overview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Client Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">CLIENT DETAILS</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{clientData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-medium">{clientData.age}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Height</p>
                      <p className="font-medium">{clientData.height} cm</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">{clientData.startDate}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">PROGRESS SUMMARY</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">Current Weight</span>
                        <span className="font-medium">{currentWeight} kg</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">Weight Change</span>
                        <span className={`font-medium ${parseFloat(weightChange) < 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {weightChange} kg
                        </span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">Progress to Goal</span>
                        <span className="font-medium">{progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weight Progress Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Weight Progress</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Weight"
                    />
                    <Line
                      type="monotone"
                      dataKey="goal"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Goal"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Measurements Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Body Measurements</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Measurement
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Initial
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {measurementsData.map((measurement, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {measurement.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">
                            {measurement.initial}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">
                            {measurement.current}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`font-medium ${
                              measurement.change < 0
                                ? 'text-green-600'
                                : measurement.change > 0
                                ? 'text-red-600'
                                : 'text-gray-900'
                            }`}
                          >
                            {measurement.change}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Nutrition Protocol */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Nutrition Protocol</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Day Type
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Days
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Protein (g)
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fats (g)
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Carbs (g)
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Calories
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">Training</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {nutritionData.trainingDays}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {nutritionData.trainingProtein}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {nutritionData.trainingFats}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {nutritionData.trainingCarbs}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {nutritionData.trainingCalories}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">Rest</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {nutritionData.restDays}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {nutritionData.restProtein}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {nutritionData.restFats}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {nutritionData.restCarbs}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {nutritionData.restCalories}
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-3 py-2 whitespace-nowrap font-medium">
                        Weekly Total
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">7</td>
                      <td className="px-3 py-2 whitespace-nowrap">1400</td>
                      <td className="px-3 py-2 whitespace-nowrap">490</td>
                      <td className="px-3 py-2 whitespace-nowrap">1000</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {nutritionData.weeklyCalories}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded p-3">
                  <p className="text-sm text-blue-700 font-medium">
                    Weekly Calorie Deficit
                  </p>
                  <p className="text-2xl font-bold text-blue-800">
                    {nutritionData.weeklyDeficit} kcal
                  </p>
                </div>
                <div className="bg-green-50 rounded p-3">
                  <p className="text-sm text-green-700 font-medium">
                    Nutrition Compliance
                  </p>
                  <p className="text-2xl font-bold text-green-800">
                    {complianceRates.nutrition}%
                  </p>
                </div>
                <div className="bg-purple-50 rounded p-3">
                  <p className="text-sm text-purple-700 font-medium">
                    Protein Per Kg
                  </p>
                  <p className="text-2xl font-bold text-purple-800">
                    {(nutritionData.trainingProtein / currentWeight).toFixed(2)} g/kg
                  </p>
                </div>
              </div>
            </div>

            {/* Compliance Rates */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Weekly Compliance</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Nutrition Compliance
                  </h3>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-5 mr-2">
                      <div
                        className={`h-5 rounded-full ${
                          complianceRates.nutrition >= 90
                            ? 'bg-green-500'
                            : complianceRates.nutrition >= 75
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${complianceRates.nutrition}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">
                      {complianceRates.nutrition}%
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Steps Compliance
                  </h3>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-5 mr-2">
                      <div
                        className={`h-5 rounded-full ${
                          complianceRates.steps >= 90
                            ? 'bg-green-500'
                            : complianceRates.steps >= 75
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${complianceRates.steps}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">
                      {complianceRates.steps}%
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Cardio Compliance
                  </h3>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-5 mr-2">
                      <div
                        className={`h-5 rounded-full ${
                          complianceRates.cardio >= 90
                            ? 'bg-green-500'
                            : complianceRates.cardio >= 75
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${complianceRates.cardio}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">
                      {complianceRates.cardio}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Plan */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Weekly Training Plan</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Day
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Training
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nutrition
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Completed
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cardio (min)
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Steps
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sleep (hrs)
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mood (1-5)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {weeklyPlanData.map((day, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-gray-50' : ''}
                      >
                        <td className="px-3 py-2 whitespace-nowrap font-medium">
                          {day.day} ({day.weekday})
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {day.training}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {day.nutrition}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {day.completed ? (
                            <Check className="text-green-500" size={20} />
                          ) : (
                            <X className="text-red-500" size={20} />
                          )}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {day.cardioActual}/{day.cardioGoal}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {day.stepsActual}/{day.stepsGoal}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {day.sleep || '-'}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {day.mood || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'checkin' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">Weekly Check-in Form</h2>
            <p className="text-gray-500 mb-6">
              Submit your progress data for the current week
            </p>

            <form onSubmit={handleCheckInSubmit} className="space-y-6">
              {/* Measurements Section */}
              <div>
                <h3 className="text-lg font-medium mb-3">Body Measurements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="weight"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Weight (kg) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.1"
                      required
                      value={checkInData.weight}
                      onChange={handleInputChange}
                      placeholder="Enter current weight"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="chest"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Chest (cm)
                    </label>
                    <input
                      id="chest"
                      name="chest"
                      type="number"
                      step="0.1"
                      value={checkInData.chest}
                      onChange={handleInputChange}
                      placeholder="Enter chest measurement"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="waist"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Waist (cm)
                    </label>
                    <input
                      id="waist"
                      name="waist"
                      type="number"
                      step="0.1"
                      value={checkInData.waist}
                      onChange={handleInputChange}
                      placeholder="Enter waist measurement"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hips"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Hips (cm)
                    </label>
                    <input
                      id="hips"
                      name="hips"
                      type="number"
                      step="0.1"
                      value={checkInData.hips}
                      onChange={handleInputChange}
                      placeholder="Enter hips measurement"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Compliance Section */}
              <div>
                <h3 className="text-lg font-medium mb-3">Weekly Compliance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="dietAdherence"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Diet Adherence (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="dietAdherence"
                      name="dietAdherence"
                      type="number"
                      min="0"
                      max="100"
                      required
                      value={checkInData.dietAdherence}
                      onChange={handleInputChange}
                      placeholder="Enter percentage"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cardioMinutes"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Cardio Minutes
                    </label>
                    <input
                      id="cardioMinutes"
                      name="cardioMinutes"
                      type="number"
                      value={checkInData.cardioMinutes}
                      onChange={handleInputChange}
                      placeholder="Enter total minutes"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="stepCount"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Average Daily Steps
                    </label>
                    <input
                      id="stepCount"
                      name="stepCount"
                      type="number"
                      value={checkInData.stepCount}
                      onChange={handleInputChange}
                      placeholder="Enter daily average"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div>
                <h3 className="text-lg font-medium mb-3">Additional Notes</h3>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={checkInData.notes}
                  onChange={handleInputChange}
                  placeholder="Share any challenges, victories, or questions for your coach..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit Check-in
                </button>
              </div>
            </form>

            {checkInData.completed && (
              <div className="mt-6 p-4 bg-green-50 text-green-800 rounded-md">
                <p className="font-medium">Check-in successfully submitted!</p>
                <p>
                  Your data has been recorded and your dashboard has been updated.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default InteractiveDashboard;