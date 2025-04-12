import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import SkillForm from '../components/skills/SkillForm';
import SkillList from '../components/skills/SkillList';

export default function SkillsPage() {
  const { user } = useAuth();
  const [editingSkill, setEditingSkill] = useState(null);

  const handleSkillSaved = () => {
    setEditingSkill(null);
    window.location.reload(); // Temporary; we'll improve this later
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      {user && <SkillForm skillToEdit={editingSkill} onSkillSaved={handleSkillSaved} />}
      <SkillList onEditSkill={setEditingSkill} />
    </div>
  );
}