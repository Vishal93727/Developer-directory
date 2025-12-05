import { useNavigate } from 'react-router-dom';

const DeveloperCard = ({ developer, index }) => {
  const navigate = useNavigate();

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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div
      onClick={() => navigate(`/developer/${developer._id}`)}
      className="card animate-slide-up hover:scale-105 cursor-pointer group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Photo or Initial */}
      <div className="flex items-center gap-4 mb-4">
        {developer.photoUrl ? (
          <img
            src={developer.photoUrl}
            alt={developer.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black text-2xl font-bold">
            {developer.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white-800 group-hover:text-primary transition-colors">
            {developer.name}
          </h3>
          <p className="text-sm font-medium text-gray-600">
            {developer.role} Developer
          </p>
        </div>
        <span className="text-3xl">
          {getRoleIcon(developer.role)}
        </span>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {developer.techStack.slice(0, 3).map((tech, idx) => (
          <span key={idx} className="badge">
            {tech}
          </span>
        ))}
        {developer.techStack.length > 3 && (
          <span className="badge">
            +{developer.techStack.length - 3} more
          </span>
        )}
      </div>

      {/* About Preview */}
      {developer.about && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {developer.about}
        </p>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>{developer.experience} years</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span>Since {formatDate(developer.joiningDate)}</span>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;