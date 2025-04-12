import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllSkills, deleteSkill } from '../../services/skillService';
import SkillCard from './SkillCard';

export default function SkillList({ onEditSkill }) {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const categoryId = query.get('categoryId');
  console.log('Category ID from URL:', categoryId);

  const fetchSkills = async () => {
    try {
      const response = await getAllSkills();
      console.log('Skills data:', response.data);
      let filteredSkills = response.data;
      if (categoryId) {
        filteredSkills = filteredSkills.filter(
          (skill) => skill.category?.categoryId === categoryId
        );
        console.log('Filtered skills:', filteredSkills);
      }
      setSkills(filteredSkills);
      setError(null);
    } catch (err) {
      setError('Failed to fetch skills');
    }
  };

  const handleDelete = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(skillId);
        fetchSkills();
        setError(null);
      } catch (err) {
        setError('Failed to delete skill');
      }
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [categoryId]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Skills</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {skills.length === 0 ? (
        <p>No skills found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <SkillCard
              key={skill.skillId}
              skill={skill}
              onEdit={onEditSkill}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}