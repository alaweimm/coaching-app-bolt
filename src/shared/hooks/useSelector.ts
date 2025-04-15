import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export function createMemoizedSelector<T>(
  selector: (state: RootState) => T,
  dependencies: string[] = []
) {
  return createSelector(
    [(state: RootState) => state, ...dependencies.map(dep => (state: RootState) => state[dep])],
    selector
  );
}