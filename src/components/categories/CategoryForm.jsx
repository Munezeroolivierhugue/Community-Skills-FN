import { useState, useEffect } from 'react';
import { createCategory, updateCategory } from '../../services/categoryService';
import Button from '../common/Button';

export default function CategoryForm({ categoryToEdit, onCategorySaved }) {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categoryToEdit) {
      setCategoryName(categoryToEdit.categoryName);
    }
  }, [categoryToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (categoryToEdit) {
        await updateCategory(categoryToEdit.categoryId, { categoryName });
      } else {
        await createCategory({ categoryName });
      }
      setCategoryName('');
      setError(null);
      if (onCategorySaved) onCategorySaved();
    } catch (err) {
      setError(err.response?.data || 'Failed to save category');
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">{categoryToEdit ? 'Edit Category' : 'Create Category'}</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
          className="flex-1 p-2 border rounded"
          required
        />
        <Button type="submit">{categoryToEdit ? 'Update' : 'Add'}</Button>
      </form>
    </div>
  );
}