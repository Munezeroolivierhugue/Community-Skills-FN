import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CategoryForm from '../components/categories/CategoryForm';
import CategoryList from '../components/categories/CategoryList';

export default function CategoriesPage() {
  const { user } = useAuth();
  const [editingCategory, setEditingCategory] = useState(null);

  const handleCategorySaved = () => {
    setEditingCategory(null);
    window.location.reload(); // Temporary; we'll improve this later
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      {user && (
        <CategoryForm categoryToEdit={editingCategory} onCategorySaved={handleCategorySaved} />
      )}
      <CategoryList onEditCategory={setEditingCategory} />
    </div>
  );
}