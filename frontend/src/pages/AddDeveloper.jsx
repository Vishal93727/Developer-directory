import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddDeveloper = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    techStack: '',
    experience: '',
    about: '',
    photoUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/developers', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Developer added!');
      navigate('/directory');
    } catch (err) {
      toast.error('Failed to add developer');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 flex items-center justify-center text-white">
      <div className="max-w-2xl w-full backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl shadow-xl p-8 animate-slide-up">

        <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Add Developer
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-white/20 rounded-xl bg-white/10 text-white placeholder-gray-400"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-white/20 rounded-xl bg-white/10 text-white placeholder-gray-400"
            >
              <option value="">Select Role</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Full-Stack">Full-Stack</option>
              <option value="DevOps">DevOps</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Tech Stack</label>
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              required
              placeholder="React, Node.js, MongoDB"
              className="w-full px-4 py-2 border border-white/20 rounded-xl bg-white/10 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Experience (years)</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 border border-white/20 rounded-xl bg-white/10 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">About (optional)</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-white/20 rounded-xl bg-white/10 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Photo URL (optional)</label>
            <input
              type="url"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white/20 rounded-xl bg-white/10 text-white placeholder-gray-400"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-black-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl disabled:bg-gray-500"
            >
              {loading ? 'Adding...' : 'Add Developer'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/directory')}
              className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddDeveloper;
