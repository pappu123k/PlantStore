import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlants, addPlant } from './features/plantSlice';

import SearchFilter from './components/SearchFilter';
import PlantList from './components/PlantList';
import AddPlantForm from './components/AddPlantForm';
import Loader from './components/Loader';
import Error from './components/Error';

const App = () => {
  const dispatch = useDispatch();
  const { plants, loading, error } = useSelector((state) => state.plants);
  const [filters, setFilters] = useState({ search: '', category: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    dispatch(fetchPlants(filters));
  }, [dispatch, filters]);

  const handleSearch = (search, category) => {
    setFilters({ search, category });
  };

  const handleAddPlant = async (plantData) => {
    try {
      await dispatch(addPlant(plantData)).unwrap();
      alert('🌱 Plant added successfully!');
      setShowAddForm(false);
    } catch (err) {
      alert(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center">
      {/* HEADER */}
      <header className="w-full bg-gradient-to-r from-green-700 to-emerald-600 py-6 shadow-md">
        <h1 className="text-4xl font-bold text-white text-center tracking-wide drop-shadow-lg">
          🌿 PlantStore
        </h1>
      </header>

      {/* TOP BAR BUTTON */}
      <div className="flex justify-end w-full px-4 sm:px-10 mt-6">
        <button
          className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-2 rounded-full shadow-md hover:from-green-700 hover:to-emerald-600 transform hover:scale-105 transition-all"
          onClick={() => setShowAddForm(true)}
        >
          + Add Plant
        </button>
      </div>

      {/* MAIN CONTENT */}
      <main className="w-full flex flex-col items-center mt-6">
        <div className="w-full px-4 sm:px-10">
          <SearchFilter onSearch={handleSearch} />
          {loading && <Loader />}
          {error && <Error message={error} />}
          <div className="w-full mt-4">
            <PlantList plants={plants} />
          </div>
        </div>
      </main>

      {/* MODAL */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg z-10 border border-green-100">
            <button
              className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-700 transition"
              onClick={() => setShowAddForm(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <AddPlantForm onAdd={handleAddPlant} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
