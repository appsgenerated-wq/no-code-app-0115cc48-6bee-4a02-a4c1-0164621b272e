import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, onionVarieties, onLogout, onLoadVarieties, onCreateVariety, onDeleteVariety }) => {
  const [newVariety, setNewVariety] = useState({ name: '', color: 'Yellow', description: '', origin: '' });
  const [photoFile, setPhotoFile] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    onLoadVarieties();
  }, [onLoadVarieties]);

  const handleCreateVariety = async (e) => {
    e.preventDefault();
    const dataToSubmit = { ...newVariety };
    if (photoFile) {
      dataToSubmit.photo = photoFile;
    }
    await onCreateVariety(dataToSubmit);
    setNewVariety({ name: '', color: 'Yellow', description: '', origin: '' });
    setPhotoFile(null);
    setIsFormVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Onion Encyclopedia</h1>
            <p className="text-gray-600">Welcome, {user?.name || 'User'}!</p>
          </div>
          <div className="space-x-2">
            <a 
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
            >
              Admin Panel
            </a>
            <button 
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="mb-8">
            <button 
                onClick={() => setIsFormVisible(!isFormVisible)}
                className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition duration-300 shadow"
            >
                {isFormVisible ? 'Cancel' : '+ Add New Onion Variety'}
            </button>
            {isFormVisible && (
                <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Add a New Variety</h2>
                <form onSubmit={handleCreateVariety} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Name (e.g., Red Baron)" value={newVariety.name} onChange={(e) => setNewVariety({...newVariety, name: e.target.value})} className="w-full p-2 border rounded-md" required />
                        <input type="text" placeholder="Origin (e.g., Italy)" value={newVariety.origin} onChange={(e) => setNewVariety({...newVariety, origin: e.target.value})} className="w-full p-2 border rounded-md" />
                    </div>
                    <select value={newVariety.color} onChange={(e) => setNewVariety({...newVariety, color: e.target.value})} className="w-full p-2 border rounded-md bg-white">
                        {['Red', 'White', 'Yellow', 'Green', 'Sweet'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <textarea placeholder="Description" value={newVariety.description} onChange={(e) => setNewVariety({...newVariety, description: e.target.value})} className="w-full p-2 border rounded-md" rows="3" />
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Photo (optional)</label>
                        <input type="file" onChange={(e) => setPhotoFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"/>
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition">Submit Variety</button>
                </form>
                </div>
            )}
        </div>

        <main>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Varieties</h2>
          {onionVarieties.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No onion varieties found. Be the first to add one!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {onionVarieties.map(variety => (
                <div key={variety.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                  {variety.photo && <img src={variety.photo.thumbnail.url} alt={variety.name} className="w-full h-40 object-cover" />}
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900">{variety.name}</h3>
                    <span className={`inline-block bg-yellow-200 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full`}>{variety.color}</span>
                    <p className="text-gray-600 text-sm mt-2 mb-2">{variety.description}</p>
                    {variety.origin && <p className="text-xs text-gray-500"><strong>Origin:</strong> {variety.origin}</p>}
                    <p className="text-xs text-gray-500 mt-2">Added by: {variety.owner?.name || 'Unknown'}</p>
                  </div>
                  {user?.id === variety.owner?.id && (
                    <button onClick={() => onDeleteVariety(variety.id)} className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 w-7 h-7 flex items-center justify-center hover:bg-red-600 transition'>
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
