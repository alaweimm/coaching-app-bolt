import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Clock, Utensils, TrendingUp, FileText } from 'lucide-react';

interface Meal {
  id: string;
  time: string;
  name: string;
  foods: {
    name: string;
    portion: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  }[];
}

interface DailyLog {
  date: string;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;
  meals: Meal[];
  notes: {
    hunger: number;
    energy: number;
    digestion: number;
    comments: string;
  };
}

const NutritionModule = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Sample data - In a real app, this would come from a database
  const dailyLog: DailyLog = {
    date: selectedDate,
    targetCalories: 2030,
    targetProtein: 200,
    targetCarbs: 150,
    targetFats: 70,
    meals: [
      {
        id: '1',
        time: '08:00',
        name: 'Breakfast',
        foods: [
          {
            name: 'Oatmeal',
            portion: '100g',
            calories: 389,
            protein: 13,
            carbs: 66,
            fats: 7,
          },
          {
            name: 'Whey Protein',
            portion: '30g',
            calories: 120,
            protein: 24,
            carbs: 3,
            fats: 2,
          },
        ],
      },
      {
        id: '2',
        time: '12:00',
        name: 'Lunch',
        foods: [
          {
            name: 'Chicken Breast',
            portion: '200g',
            calories: 330,
            protein: 62,
            carbs: 0,
            fats: 7,
          },
          {
            name: 'Brown Rice',
            portion: '150g',
            calories: 165,
            protein: 3,
            carbs: 35,
            fats: 1,
          },
        ],
      },
    ],
    notes: {
      hunger: 7,
      energy: 8,
      digestion: 9,
      comments: 'Feeling good today, high energy levels throughout.',
    },
  };

  // Calculate daily totals
  const dailyTotals = dailyLog.meals.reduce(
    (acc, meal) => {
      const mealTotals = meal.foods.reduce(
        (foodAcc, food) => ({
          calories: foodAcc.calories + food.calories,
          protein: foodAcc.protein + food.protein,
          carbs: foodAcc.carbs + food.carbs,
          fats: foodAcc.fats + food.fats,
        }),
        { calories: 0, protein: 0, carbs: 0, fats: 0 }
      );
      return {
        calories: acc.calories + mealTotals.calories,
        protein: acc.protein + mealTotals.protein,
        carbs: acc.carbs + mealTotals.carbs,
        fats: acc.fats + mealTotals.fats,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  // Weekly data for trends
  const weeklyData = [
    { day: 'Mon', calories: 2030, target: 2030 },
    { day: 'Tue', calories: 1950, target: 2030 },
    { day: 'Wed', calories: 2100, target: 2030 },
    { day: 'Thu', calories: 1980, target: 2030 },
    { day: 'Fri', calories: 2050, target: 2030 },
    { day: 'Sat', calories: 2150, target: 2030 },
    { day: 'Sun', calories: dailyTotals.calories, target: 2030 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Nutrition Tracking</h1>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Daily Macro Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Calories</h3>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Utensils className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-gray-900">
              {dailyTotals.calories}
              <span className="text-lg text-gray-500 ml-2">/ {dailyLog.targetCalories}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2"
                style={{
                  width: `${Math.min(
                    (dailyTotals.calories / dailyLog.targetCalories) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {[
          {
            label: 'Protein',
            current: dailyTotals.protein,
            target: dailyLog.targetProtein,
            color: 'bg-green-600',
            bgColor: 'bg-green-100',
            textColor: 'text-green-600',
          },
          {
            label: 'Carbs',
            current: dailyTotals.carbs,
            target: dailyLog.targetCarbs,
            color: 'bg-yellow-600',
            bgColor: 'bg-yellow-100',
            textColor: 'text-yellow-600',
          },
          {
            label: 'Fats',
            current: dailyTotals.fats,
            target: dailyLog.targetFats,
            color: 'bg-red-600',
            bgColor: 'bg-red-100',
            textColor: 'text-red-600',
          },
        ].map((macro) => (
          <div key={macro.label} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{macro.label}</h3>
              <div className={`p-2 ${macro.bgColor} rounded-lg`}>
                <TrendingUp className={`w-5 h-5 ${macro.textColor}`} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">
                {macro.current}g
                <span className="text-lg text-gray-500 ml-2">/ {macro.target}g</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${macro.color} rounded-full h-2`}
                  style={{
                    width: `${Math.min((macro.current / macro.target) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Meal Breakdown */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Meal Breakdown</h2>
        <div className="space-y-6">
          {dailyLog.meals.map((meal) => (
            <div key={meal.id} className="border-b border-gray-200 pb-6 last:border-0">
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-gray-500 mr-2" />
                <span className="font-medium text-gray-900">{meal.time}</span>
                <span className="mx-2">-</span>
                <span className="font-medium text-gray-900">{meal.name}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Food</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Portion</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Calories</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">P</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">C</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">F</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {meal.foods.map((food, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-900">{food.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{food.portion}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{food.calories}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{food.protein}g</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{food.carbs}g</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{food.fats}g</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Weekly Calorie Trends</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={['dataMin - 100', 'dataMax + 100']} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="calories"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Actual"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#9CA3AF"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daily Notes */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-6">
          <FileText className="w-6 h-6 text-gray-500 mr-2" />
          <h2 className="text-xl font-semibold">Daily Notes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            { label: 'Hunger Level', value: dailyLog.notes.hunger, max: 10 },
            { label: 'Energy Level', value: dailyLog.notes.energy, max: 10 },
            { label: 'Digestion Quality', value: dailyLog.notes.digestion, max: 10 },
          ].map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">{metric.label}</span>
                <span className="text-sm font-medium text-gray-900">
                  {metric.value}/{metric.max}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 rounded-full h-2"
                  style={{ width: `${(metric.value / metric.max) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700">{dailyLog.notes.comments}</p>
        </div>
      </div>
    </div>
  );
};

export default NutritionModule;