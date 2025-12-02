import { useState } from 'react';
import toast from 'react-hot-toast';
import { addDeveloper } from '../services/api';

const ROLES = ['Frontend', 'Backend', 'Full-Stack', 'DevOps', 'Mobile'];

const DeveloperForm = ({ onDeveloperAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    techStack: '',
    experience: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error('Name is required'), false;
    if (!formData.role) return toast.error('Please select a role'), false;
    if (!formData.techStack.trim()) return toast.error('Tech stack is required'), false;
    if (!formData.experience || formData.experience < 0)
      return toast.error('Valid experience is required'), false;

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await addDeveloper(formData);
      toast.success(response.message || 'Developer added successfully!');

      setFormData({ name: '', role: '', techStack: '', experience: '' });
      if (onDeveloperAdded) onDeveloperAdded();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add developer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray border border-white shadow-xl rounded-3xl p-8 animate-fade-in">

      <h2 className="text-3xl font-extrabold mb-6  bg-clip-text 
        bg- tracking-tight">
        Add New Developer
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">


        <div>
          <label className="block text-sm font-semibold text-white-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm 
              text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary 
              transition-all"
          />
        </div>


        <div>
          <label className="block text-sm font-semibold text-white-700 mb-2">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 
              shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          >
            <option value="">Select a role</option>
            {ROLES.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>


        <div>
          <label className="block text-sm font-semibold text-white-700 mb-2">Tech Stack</label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm 
              text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary 
              transition-all"
          />
          <p className="text-xs text-black-500 mt-1">Separate technologies with commas</p>
        </div>


        <div>
          <label className="block text-sm font-semibold text-white-700 mb-2">
            Experience (years)
          </label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="3"
            min="0"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm 
              text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary 
              focus:border-primary transition-all"
          />
        </div>


        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl text-white font-semibold 
            bg-gradient-to-r from-primary to-secondary shadow-lg hover:scale-[1.02] 
            transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor"
                  strokeWidth="4" className="opacity-25" fill="none" />
                <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 
                  0 5.373 0 12h4zm2 5.291A7.962 
                  7.962 0 014 12H0c0 3.042 1.135 
                  5.824 3 7.938l3-2.647z" />
              </svg>
              Adding...
            </span>
          ) : (
            'Add Developer'
          )}
        </button>

      </form>
    </div>
  );
};

export default DeveloperForm;
