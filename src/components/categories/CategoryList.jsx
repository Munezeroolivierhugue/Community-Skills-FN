import { useState, useEffect } from 'react';
import { getAllCategories, deleteCategory } from '../../services/categoryService';
import CategoryCard from './CategoryCard';

export default function CategoryList({ onEditCategory }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch categories');
    }
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(categoryId);
        fetchCategories();
        setError(null);
      } catch (err) {
        setError('Failed to delete category');
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Categories</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.categoryId}
              category={category}
              onEdit={onEditCategory}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}