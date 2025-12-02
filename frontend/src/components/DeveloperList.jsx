const DeveloperList = ({ developers, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="card animate-pulse">
            <div className="h-6 bg-white-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-white-200 rounded w-1/2 mb-3"></div>
            <div className="flex gap-2 mb-3">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (developers.length === 0) {
    return (
      <div className="card text-center py-12 animate-fade-in">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-white-700 mb-2">
          No developers found
        </h3>
        <p className="text-white-500">
          Try adjusting your filters or add a new developer
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {developers.map((dev, index) => (
        <div
          key={dev._id}
          className="card animate-slide-up hover:scale-105 cursor-pointer"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-white-800">
              {dev.name}
            </h3>
            <span className="text-2xl">
              {dev.role === 'Frontend' }
              {dev.role === 'Backend' }
              {dev.role === 'Full-Stack'}
              {dev.role === 'DevOps'}
              {dev.role === 'Mobile'}
            </span>
          </div>

          <p className="text-sm font-medium text-primary mb-3">
            {dev.role} Developer
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {dev.techStack.map((tech, idx) => (
              <span key={idx} className="badge">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {dev.experience} {dev.experience === 1 ? 'year' : 'years'} experience
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeveloperList;