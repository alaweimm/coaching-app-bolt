import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Copy } from 'lucide-react';
import { fetchMealTemplates } from '../nutritionSlice';
import { useNutritionCalculations } from '../hooks/useNutritionCalculations';
import type { AppDispatch, RootState } from '../../../store/store';
import type { MealTemplate } from '../types/nutrition.types';

interface MealTemplatesProps {
  onTemplateSelect?: (template: MealTemplate) => void;
}

export const MealTemplates: React.FC<MealTemplatesProps> = ({ onTemplateSelect }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { mealTemplates, loading } = useSelector((state: RootState) => state.nutrition);
  const { formatMacros } = useNutritionCalculations();

  useEffect(() => {
    dispatch(fetchMealTemplates());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Meal Templates</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mealTemplates.map((template) => {
            const macros = formatMacros(template.totalMacros);
            return (
              <div
                key={template.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onTemplateSelect?.(template)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900">{template.name}</h3>
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTemplateSelect?.(template);
                    }}
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-500">
                    {template.foods.length} items
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Calories: </span>
                      <span className="font-medium">{macros.calories}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Protein: </span>
                      <span className="font-medium">{macros.protein}g</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Carbs: </span>
                      <span className="font-medium">{macros.carbs}g</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Fats: </span>
                      <span className="font-medium">{macros.fats}g</span>
                    </div>
                  </div>

                  {template.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {template.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};