import { useState } from 'react';

const ROLES = ['All', 'Frontend', 'Backend', 'Full-Stack', 'DevOps', 'Mobile'];

const Filters = ({ onFilterChange }) => {
  const [selectedRole, setSelectedRole] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    onFilterChange({ role, search: searchTerm });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ role: selectedRole, search: value });
  };

  return (
    <div className="card animate-fade-in bg-grey p-6 rounded-2xl shadow-lg border border-gray-100">
      
      <h3 className="text-xl font-semibold text-white-900 mb-4">
        Filter Developers
      </h3>

      <div className="space-y-5">

      
        <div>
          <label className="block text-sm font-medium text-white-600 mb-2">
            Search by Technology
          </label>

          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="e.g., React, Python..."
            className="w-full px-4 py-2 rounded-xl border border-gray-300 text-black-800 
            focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium text-white-600 mb-3">
            Filter by Role
          </label>

          <div className="flex flex-wrap gap-2">
            {ROLES.map(role => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`px-4 py-2 rounded-full transition-all duration-200 border 
                  ${
                    selectedRole === role
                      ? 'bg-primary text-white shadow-md scale-105 border-primary'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'
                  }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Filters;
