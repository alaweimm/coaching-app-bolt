import { useState, useCallback } from 'react';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { apiClient } from '../../../api/apiClient';
import { API_ENDPOINTS } from '../../../config/constants';
import type { Food } from '../types/nutrition.types';

interface UseFoodSearchReturn {
  searchResults: Food[];
  loading: boolean;
  error: string | null;
  searchFood: (query: string) => Promise<void>;
}

export function useFoodSearch(): UseFoodSearchReturn {
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce((query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    apiClient.get(`${API_ENDPOINTS.NUTRITION.FOODS}?search=${query}`)
      .then(response => {
        setSearchResults(response.data);
      })
      .catch(err => {
        setError(err.message || 'Failed to search foods');
        setSearchResults([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 300);

  const searchFood = useCallback((query: string) => {
    return debouncedSearch(query);
  }, [debouncedSearch]);

  return {
    searchResults,
    loading,
    error,
    searchFood,
  };
}