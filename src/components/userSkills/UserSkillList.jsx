import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllUserSkills, deleteUserSkill } from '../../services/userSkillService';
import UserCard from '../users/UserCard';
import SkillCard from '../skills/SkillCard';
import Button from '../common/Button';

export default function UserSkillList({ onEditUserSkill }) {
  const { user } = useAuth();
  const [userSkills, setUserSkills] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const userId = query.get('userId');
  const skillId = query.get('skillId');

  const fetchUserSkills = async () => {
    try {
      const response = await getAllUserSkills();
      let filteredUserSkills = response.data;
      if (userId) {
        filteredUserSkills = filteredUserSkills.filter(
          (userSkill) => userSkill.user?.userId == userId
        );
      }
      if (skillId) {
        filteredUserSkills = filteredUserSkills.filter(
          (userSkill) => userSkill.skill?.skillId == skillId
        );
      }
      setUserSkills(filteredUserSkills);
      setError(null);
    } catch (err) {
      setError('Failed to fetch user-skills');
    }
  };

  const handleDelete = async (userSkillId) => {
    if (window.confirm('Are you sure you want to delete this user-skill association?')) {
      try {
        await deleteUserSkill(userSkillId);
        fetchUserSkills();
        setError(null);
      } catch (err) {
        setError('Failed to delete user-skill');
      }
    }
  };

  useEffect(() => {
    fetchUserSkills();
  }, [userId, skillId]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">User-Skills</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {userSkills.length === 0 ? (
        <p>No user-skills found.</p>
      ) : (
        <div className="space-y-4">
          {userSkills.map((userSkill) => (
            <div key={userSkill.userSkillId} className="flex items-center p-4 bg-gray-100 rounded-lg">
              <div className="flex-1">
                <UserCard user={userSkill.user} />
              </div>
              <div className="flex-1">
                <SkillCard skill={userSkill.skill} />
              </div>
              {user && user.userId === userSkill.user?.userId && (
                <div className="space-x-2">
                  <Button onClick={() => onEditUserSkill(userSkill)} className="bg-yellow-500 hover:bg-yellow-600">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(userSkill.userSkillId)} className="bg-red-500 hover:bg-red-600">
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}