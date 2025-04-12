import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createSession, updateSession } from '../../services/sessionService';
import { getAllUsers } from '../../services/userService';
import { getAllSkills } from '../../services/skillService';
import Button from '../common/Button';

export default function SessionForm({ sessionToEdit, onSessionSaved }) {
  const { user } = useAuth();
  const [session, setSession] = useState({
    offeringUser: { userId: '' },
    requestingUser: { userId: user?.userId || '' },
    skill: { skillId: '' },
    sessionDateTime: '',
    location: 'Online',
  });
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, skillsResponse] = await Promise.all([getAllUsers(), getAllSkills()]);
        const filteredUsers = usersResponse.data.filter(u => u.userId !== user.userId);
        setUsers(filteredUsers);
        setSkills(skillsResponse.data);
      } catch (err) {
        setError('Failed to fetch users or skills');
      }
    };
    fetchData();

    if (sessionToEdit) {
      setSession({
        offeringUser: { userId: sessionToEdit.offeringUser?.userId || '' },
        requestingUser: { userId: sessionToEdit.requestingUser?.userId || user.userId },
        skill: { skillId: sessionToEdit.skill?.skillId || '' },
        sessionDateTime: sessionToEdit.sessionDateTime ? new Date(sessionToEdit.sessionDateTime).toISOString().slice(0, 16) : '',
        location: sessionToEdit.location || 'Online',
      });
    }
  }, [sessionToEdit, user.userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'offeringUserId') {
      setSession({ ...session, offeringUser: { userId: value } });
    } else if (name === 'skillId') {
      setSession({ ...session, skill: { skillId: value } });
    } else {
      setSession({ ...session, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        offeringUserId: session.offeringUser.userId,
        requestingUserId: session.requestingUser.userId,
        skillId: session.skill.skillId,
        sessionDateTime: session.sessionDateTime,
        location: session.location,
      };
      if (sessionToEdit) {
        await updateSession(sessionToEdit.sessionId, payload);
      } else {
        await createSession({
          ...payload,
          status: 'PENDING',
        });
      }
      setError(null);
      if (onSessionSaved) onSessionSaved();
    } catch (err) {
      setError(err.response?.data || 'Failed to save session');
      console.error('Error response:', err.response?.data);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">{sessionToEdit ? 'Edit Session' : 'Create Session'}</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <div>
          <label className="block text-gray-700">Book Session With (Offering User)</label>
          <select
            name="offeringUserId"
            value={session.offeringUser.userId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
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
            value={session.skill.skillId}
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
        <div>
          <label className="block text-gray-700">Date and Time</label>
          <input
            type="datetime-local"
            name="sessionDateTime"
            value={session.sessionDateTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={session.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <Button type="submit">{sessionToEdit ? 'Update' : 'Add'}</Button>
      </form>
    </div>
  );
}