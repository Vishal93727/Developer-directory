import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signup(formData);
    
    if (result.success) {
      navigate('/directory');
    }
    
    setLoading(false);
  };

  return (<div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 text-white">

  <div className="max-w-md w-full">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text p-6 mb-2">
        DEVELOPER DIRECTORY
      </h1>
    <div className="text-center mb-8 animate-fade-in">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text  mb-2">
        Create Account
      </h1>
      <p className="text-gray-300">Join the developer directory community</p>
    </div>

    <div className="backdrop-blur-xl bg-white/10 border border-white/10 
        rounded-2xl p-6 shadow-xl animate-slide-up">

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="input-field bg-white/10 border-white/20 text-white placeholder-gray-400 m-2 p-3 rounded-xl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="input-field bg-white/10 border-white/20 text-white placeholder-gray-400 m-2 p-3 rounded-xl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
            placeholder="••••••••"
            className="input-field bg-white/10 border-white/20 text-white placeholder-gray-400 m-2 p-3 rounded-xl"
          />
          <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full bg-gradient-to-r from-primary to-secondary 
                     text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-2xl"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-300">
          Already have an account?{' '}
          <Link 
            to="/login"
            className="text-secondary font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  </div>
</div>


  );
};

export default Signup;