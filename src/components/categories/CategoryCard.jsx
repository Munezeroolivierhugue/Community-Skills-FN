import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

export default function CategoryCard({ category, onEdit, onDelete }) {
  const { user } = useAuth();

  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
      <Link to={`/skills?categoryId=${category.categoryId}`} className="block">
        <h3 className="text-lg font-semibold">{category.categoryName}</h3>
      </Link>
      {user && (
        <div className="mt-2 space-x-2">
          <Button onClick={() => onEdit(category)} className="bg-yellow-500 hover:bg-yellow-600">
            Edit
          </Button>
          <Button onClick={() => onDelete(category.categoryId)} className="bg-red-500 hover:bg-red-600">
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}