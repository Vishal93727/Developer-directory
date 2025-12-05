import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { getDevelopers } from '../services/api';

import DeveloperCard from '../components/DeveloperCard';
import FilterBar from '../components/FilterBar';
import SortBar from '../components/SortBar';
import Pagination from '../components/Pagination';

const Directory = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    role: 'All',
    search: '',
    sort: 'newest',
    page: 1,
    limit: 9
  });

  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    currentPage: 1
  });

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDevelopers();
  }, [filters]);

  const fetchDevelopers = async () => {
    setLoading(true);
    try {
      const response = await getDevelopers(filters);
      setDevelopers(response.data);
      setPagination({
        total: response.total,
        pages: response.pages,
        currentPage: response.page
      });
    } catch (err) {
      toast.error('Failed to load developers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen py-10 px-4 sm:px-6 lg:px-10
                 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
                 text-white">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex justify-between items-center flex-wrap gap-6">

          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold 
                           bg-gradient-to-r from-primary to-secondary bg-clip-text ">
              Developer Directory
            </h1>
            <p className="text-white/80 mt-2">
              Welcome back, <span className="font-semibold">{user?.name}</span>
            </p>
          </div>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => navigate('/add-developer')}
              className="px-5 py-2.5 rounded-xl text-white font-medium
                         bg-gradient-to-r from-primary to-secondary
                         shadow-lg hover:shadow-2xl transition-all">
              + Add Developer
            </button>

            <button
              onClick={logout}
              className="px-5 py-2.5 rounded-xl text-white/80 hover:text-white
                         bg-white/10 backdrop-blur-xl border border-white/20
                         hover:bg-white/20 transition-all shadow">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* STATS CARD */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="backdrop-blur-xl bg-white/10 border border-white/10 
                        rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all">

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-white/90">Total Developers</h2>
              <p className="text-4xl font-extrabold text-primary mt-1">
                {pagination.total}
              </p>
            </div>

            <div className="text-6xl">👨‍💻</div>
          </div>
        </div>
      </div>

      {/* FILTERS + SORT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 backdrop-blur-xl bg-white/10 
                        rounded-2xl p-6 border border-white/10 shadow-lg">
          <FilterBar onFilterChange={handleFilterChange} />
        </div>

        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 
                        border border-white/10 shadow-lg">
          <SortBar onSortChange={handleFilterChange} />
        </div>
      </div>

      {/* DEVELOPERS GRID */}
      <div className="max-w-7xl mx-auto">

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i}
                className="backdrop-blur-xl bg-white/10 border border-white/10 
                           rounded-2xl p-6 shadow animate-pulse">

                <div className="h-6 bg-white/20 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-white/20 rounded w-1/2 mb-3"></div>
                <div className="flex gap-2 mb-3">
                  <div className="h-6 bg-white/20 rounded w-16"></div>
                  <div className="h-6 bg-white/20 rounded w-16"></div>
                </div>
                <div className="h-4 bg-white/20 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : developers.length === 0 ? (
          <div className="text-center p-16 backdrop-blur-xl bg-white/10 
                          rounded-2xl border border-white/10 shadow">
            <div className="text-7xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No developers found</h3>
            <p className="text-white/70 mb-6">Try adjusting your filters</p>

            <button
              onClick={() => navigate('/add-developer')}
              className="px-6 py-3 rounded-xl font-semibold
                         bg-gradient-to-r from-primary to-secondary 
                         text-white shadow-lg">
              Add First Developer
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {developers.map((dev, index) => (
                <DeveloperCard
                  key={dev._id}
                  developer={dev}
                  index={index}
                  onUpdate={fetchDevelopers}
                />
              ))}
            </div>

            {/* PAGINATION */}
            {pagination.pages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.pages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>

    </div>
  );
};

export default Directory;
