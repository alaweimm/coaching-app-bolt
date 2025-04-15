import React, { useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { TableColumn } from '../types/common.types';

interface DataGridProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (item: T) => void;
  rowHeight?: number;
  loadMore?: () => void;
  isLoading?: boolean;
}

export function DataGrid<T>({
  data,
  columns,
  onRowClick,
  rowHeight = 48,
  loadMore,
  isLoading = false
}: DataGridProps<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => rowHeight, [rowHeight]),
    overscan: 5
  });

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (
      loadMore &&
      !isLoading &&
      target.scrollHeight - target.scrollTop <= target.clientHeight * 1.5
    ) {
      loadMore();
    }
  }, [loadMore, isLoading]);

  return (
    <div 
      ref={parentRef}
      className="overflow-auto max-h-[600px]"
      onScroll={handleScroll}
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const item = data[virtualRow.index];
            return (
              <tr
                key={virtualRow.index}
                onClick={() => onRowClick?.(item)}
                className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                style={{
                  height: `${rowHeight}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {column.cell
                      ? column.cell(item[column.accessorKey])
                      : String(item[column.accessorKey])}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
}