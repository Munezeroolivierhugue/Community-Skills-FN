import { useState, useEffect } from 'react';
import { createUserSkill, updateUserSkill } from '../../services/userSkillService';
import { getAllUsers } from '../../services/userService';
import { getAllSkills } from '../../services/skillService';
import Button from '../common/Button';

export default function UserSkillForm({ userSkillToEdit, onUserSkillSaved, defaultUserId }) {
  const [userSkill, setUserSkill] = useState({ user: { userId: defaultUserId || '' }, skill: { skillId: '' } });
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, skillsResponse] = await Promise.all([getAllUsers(), getAllSkills()]);
        setUsers(usersResponse.data);
        setSkills(skillsResponse.data);
      } catch (err) {
        setError('Failed to fetch users or skills');
      }
    };
    fetchData();

    if (userSkillToEdit) {
      setUserSkill({
        user: { userId: userSkillToEdit.user?.userId || '' },
        skill: { skillId: userSkillToEdit.skill?.skillId || '' },
      });
    }
  }, [userSkillToEdit, defaultUserId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userId') {
      setUserSkill({ ...userSkill, user: { userId: value } });
    } else if (name === 'skillId') {
      setUserSkill({ ...userSkill, skill: { skillId: value } });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userSkillToEdit) {
        await updateUserSkill(userSkillToEdit.userSkillId, {
          userId: userSkill.user.userId,
          skillId: userSkill.skill.skillId,
        });
      } else {
        await createUserSkill({
          user: { userId: userSkill.user.userId },
          skill: { skillId: userSkill.skill.skillId },
        });
      }
      setError(null);
      if (onUserSkillSaved) onUserSkillSaved();
    } catch (err) {
      setError(err.response?.data || 'Failed to save user-skill');
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">{userSkillToEdit ? 'Edit User-Skill' : 'Add Skill to Profile'}</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <div>
          <label className="block text-gray-700">User</label>
          <select
            name="userId"
            value={userSkill.user.userId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled={!!defaultUserId} // Disable if defaultUserId is set
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Skill</label>
          <select
            name="skillId"
            value={userSkill.skill.skillId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a skill</option>
            {skills.map((skill) => (
              <option key={skill.skillId} value={skill.skillId}>
                {skill.skillName}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit">{userSkillToEdit ? 'Update' : 'Add'}</Button>
      </form>
    </div>
  );
}