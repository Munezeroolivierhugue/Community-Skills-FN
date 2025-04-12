import { useState, useEffect } from 'react';
import { createSkill, updateSkill } from '../../services/skillService';
import { getAllCategories } from '../../services/categoryService';
import Button from '../common/Button';

export default function SkillForm({ skillToEdit, onSkillSaved }) {
  const [skill, setSkill] = useState({ skillName: '', category: { categoryId: '' } });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch categories');
      }
    };
    fetchCategories();

    if (skillToEdit) {
      setSkill({
        skillName: skillToEdit.skillName,
        category: { categoryId: skillToEdit.category?.categoryId || '' },
      });
    }
  }, [skillToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'categoryId') {
      setSkill({ ...skill, category: { categoryId: value } });
    } else {
      setSkill({ ...skill, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (skillToEdit) {
        await updateSkill(skillToEdit.skillId, {
          skillName: skill.skillName,
          categoryId: skill.category.categoryId,
        });
      } else {
        await createSkill({
          skillName: skill.skillName,
          category: { categoryId: skill.category.categoryId },
        });
      }
      setError(null);
      if (onSkillSaved) onSkillSaved();
    } catch (err) {
      setError(err.response?.data || 'Failed to save skill');
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">{skillToEdit ? 'Edit Skill' : 'Create Skill'}</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <div>
          <label className="block text-gray-700">Skill Name</label>
          <input
            type="text"
            name="skillName"
            value={skill.skillName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Category</label>
          <select
            name="categoryId"
            value={skill.category.categoryId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit">{skillToEdit ? 'Update' : 'Add'}</Button>
      </form>
    </div>
  );
}