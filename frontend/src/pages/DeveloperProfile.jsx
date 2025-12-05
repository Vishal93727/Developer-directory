import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getDeveloper, deleteDeveloper } from '../services/api';

const DeveloperProfile = () => {
  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeveloper();
  }, [id]);

  const fetchDeveloper = async () => {
    try {
      const response = await getDeveloper(id);
      setDeveloper(response.data);
    } catch (err) {
      toast.error('Failed to load developer profile');
      navigate('/directory');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteDeveloper(id);
      toast.success('Developer deleted successfully');
      navigate('/directory');
    } catch (err) {
      toast.error('Failed to delete developer');
      setDeleting(false);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  const getRoleIcon = (role) => {
    const icons = {
      'Frontend': '💻',
      'Backend': '⚙️',
      'Full-Stack': '🚀',
      'DevOps': '🔧',
      'Mobile': '📱'
    };
    return icons[role] || '👨‍💻';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-primary mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!developer) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">

      {/* Back Button */}
      <div className="max-w-5xl mx-auto mb-6">
        <button
          onClick={() => navigate('/directory')}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Directory
        </button>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">

        {/* Profile Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 animate-slide-up flex flex-col md:flex-row gap-6">

          {/* Photo */}
          <div className="flex-shrink-0">
            {developer.photoUrl ? (
              <img
                src={developer.photoUrl}
                alt={developer.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-400 flex items-center justify-center text-white text-5xl font-bold">
                {developer.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">

            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">{developer.name}</h1>
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">{getRoleIcon(developer.role)}</span>
                  <span className="font-medium">{developer.role} Developer</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/edit-developer/${developer._id}`)}
                  className="px-4 py-2 bg-primary rounded-xl hover:shadow-lg transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-2 bg-red-500 rounded-xl hover:shadow-lg transition-all"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <span>🕒</span> {developer.experience} years experience
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span>📅</span> Joined {formatDate(developer.joiningDate)}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-sm font-medium mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {developer.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* About Section */}
        {developer.about && (
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 animate-slide-up">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{developer.about}</p>
          </div>
        )}

        {/* Additional Info */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 animate-slide-up">
          <h2 className="text-xl font-bold mb-4">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <p className="text-sm">Added by</p>
              <p className="font-medium text-white">{developer.createdBy?.name || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-sm">Date Added</p>
              <p className="font-medium text-white">{formatDate(developer.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm">Last Updated</p>
              <p className="font-medium text-white">{formatDate(developer.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 max-w-md w-full animate-slide-up">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6 text-gray-200">
              Are you sure you want to delete <strong>{developer.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-red-500 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DeveloperProfile;
