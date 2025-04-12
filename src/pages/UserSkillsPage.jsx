import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import UserSkillForm from '../components/userSkills/UserSkillForm';
import UserSkillList from '../components/userSkills/UserSkillList';

export default function UserSkillsPage() {
  const { user } = useAuth();
  const [editingUserSkill, setEditingUserSkill] = useState(null);

  const handleUserSkillSaved = () => {
    setEditingUserSkill(null);
    window.location.reload(); // Temporary; we'll improve this later
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">User-Skills</h2>
      {user && (
        <UserSkillForm
          userSkillToEdit={editingUserSkill}
          onUserSkillSaved={handleUserSkillSaved}
          defaultUserId={user.userId}
        />
      )}
      <UserSkillList onEditUserSkill={setEditingUserSkill} />
    </div>
  );
}