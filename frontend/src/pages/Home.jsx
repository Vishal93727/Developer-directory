import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import DeveloperForm from '../components/DeveloperForm';
import DeveloperList from '../components/DeveloperList';
import Filters from '../components/Filters';
import { getDevelopers } from '../services/api';

const Home = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ role: 'All', search: '' });

  const fetchDevelopers = async () => {
    setLoading(true);
    try {
      const response = await getDevelopers(filters);
      setDevelopers(response.data);
    } catch (err) {
      toast.error('Failed to load developers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-12 
                    bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                    text-white">

      <div className="max-w-7xl mx-auto">

      
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold
          text-white-300 
                         bg-gradient-to-r from-primary to-secondary 
                        ">
            Developer Directory
          </h1>

          <p className="text-white-300 text-base sm:text-lg mt-3">
            Discover, Manage & Explore Talented Developers
          </p>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">

          
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="backdrop-blur-xl bg-white/10 border border-white/10 
                            rounded-2xl p-6 shadow-lg hover:shadow-2xl 
                            transition-all duration-300">
              <DeveloperForm onDeveloperAdded={fetchDevelopers} />
            </div>
          </div>

        
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="backdrop-blur-xl bg-white/10 border border-white/10 
                            rounded-2xl p-6 shadow-lg hover:shadow-2xl 
                            transition-all duration-300">
              <Filters onFilterChange={handleFilterChange} />
            </div>
          </div>

        </div>

      
        <div className="mb-12">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 shadow-lg 
                          border border-white/10 hover:border-primary/40
                          hover:shadow-primary/30 hover:shadow-xl
                          transition-all duration-300 flex justify-between 
                          items-center flex-wrap gap-4">

            <h2 className="text-2xl font-bold">
              All Developers
            </h2>

            <span className="px-6 py-2 rounded-full text-sm sm:text-base font-semibold
                            bg-gradient-to-r from-primary to-secondary 
                            shadow-md text-white">
              {developers.length} {developers.length === 1 ? 'developer' : 'developers'}
            </span>
          </div>
        </div>


        <DeveloperList developers={developers} loading={loading} />

      </div>
    </div>
  );
};

export default Home;
