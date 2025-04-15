import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import { SearchBar } from '../../../shared/components/SearchBar';
import { DataGrid } from '../../../shared/components/DataGrid';
import { useFoodSearch } from '../hooks/useFoodSearch';
import { fetchFoods } from '../nutritionSlice';
import type { AppDispatch, RootState } from '../../../store/store';
import type { Food } from '../types/nutrition.types';

interface FoodLibraryProps {
  onFoodSelect?: (food: Food) => void;
}

const FoodLibrary: React.FC<FoodLibraryProps> = ({ onFoodSelect }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { foods, loading } = useSelector((state: RootState) => state.nutrition);
  const { searchResults, searchFood } = useFoodSearch();

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  const displayedFoods = searchResults.length > 0 ? searchResults : foods;

  const columns = [
    { id: 'name', header: 'Name', accessorKey: 'name' },
    { id: 'serving', header: 'Serving', accessorKey: 'servingSize',
      cell: (value: number) => `${value}g` },
    { id: 'calories', header: 'Calories', accessorKey: 'macros.calories' },
    { id: 'protein', header: 'Protein', accessorKey: 'macros.protein',
      cell: (value: number) => `${value}g` },
    { id: 'carbs', header: 'Carbs', accessorKey: 'macros.carbs',
      cell: (value: number) => `${value}g` },
    { id: 'fats', header: 'Fats', accessorKey: 'macros.fats',
      cell: (value: number) => `${value}g` },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Food Library</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Food
        </button>
      </div>

      <SearchBar
        onSearch={searchFood}
        placeholder="Search foods..."
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <DataGrid
          data={displayedFoods}
          columns={columns}
          onRowClick={onFoodSelect}
        />
      )}
    </div>
  );
};

export default FoodLibrary;