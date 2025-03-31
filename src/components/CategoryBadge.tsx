import React from 'react';
//import { Category } from '@/lib/types';
import { getCategoryById } from '@/lib/sampleData';

interface CategoryBadgeProps {
  categoryId?: string;
  className?: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  categoryId,
  className = '',
}) => {
  const category = categoryId ? getCategoryById(categoryId) : null;

  if (!category) {
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 border-2 border-black ${className}`}>
        Sin categoría
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs font-medium border-2 border-black ${className}`}
      style={{ backgroundColor: `${category.color}20` }}
    >
      {category.name}
    </span>
  );
};

export default CategoryBadge;
