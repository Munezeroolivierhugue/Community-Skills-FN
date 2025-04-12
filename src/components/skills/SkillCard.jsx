import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

export default function SkillCard({ skill, onEdit, onDelete }) {
  const { user } = useAuth();

  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
      <Link to={`/user-skills?skillId=${skill.skillId}`} className="block">
        <h3 className="text-lg font-semibold">{skill.skillName}</h3>
        <p className="text-gray-600">Category: {skill.category?.categoryName || 'N/A'}</p>
      </Link>
      {user && (
        <div className="mt-2 space-x-2">
          <Button onClick={() => onEdit(skill)} className="bg-yellow-500 hover:bg-yellow-600">
            Edit
          </Button>
          <Button onClick={() => onDelete(skill.skillId)} className="bg-red-500 hover:bg-red-600">
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}