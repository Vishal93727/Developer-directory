import { useState } from 'react';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First', icon: '🆕' },
  { value: 'exp_desc', label: 'Most Experienced', icon: '⬆️' },
  { value: 'exp_asc', label: 'Least Experienced', icon: '⬇️' },
  { value: 'name_asc', label: 'Name (A-Z)', icon: '🔤' },
  { value: 'name_desc', label: 'Name (Z-A)', icon: '🔡' }
];

const SortBar = ({ onSortChange }) => {
  const [selectedSort, setSelectedSort] = useState('newest');

  const handleSortChange = (sortValue) => {
    setSelectedSort(sortValue);
    onSortChange({ sort: sortValue });
  };

  return (
    <div className="card animate-fade-in">
      <h3 className="text-lg font-semibold text-white-800 mb-4">
        Sort By
      </h3>
      
      <div className="space-y-2">
        {SORT_OPTIONS.map(option => (
          <button
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
              selectedSort === option.value
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">{option.icon}</span>
            <span className="font-medium">{option.label}</span>
            {selectedSort === option.value && (
              <svg className="w-5 h-5 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortBar;