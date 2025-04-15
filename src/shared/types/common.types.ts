import { ReactNode } from 'react';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface SearchParams {
  query: string;
  filters?: Record<string, unknown>;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface TableColumn<T> {
  id: string;
  header: string;
  accessorKey: keyof T;
  cell?: (value: any) => ReactNode;
}

export interface ChartData {
  label: string;
  value: number;
  color?: string;
}