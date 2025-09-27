import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import './index.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [onionVarieties, setOnionVarieties] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest();

  useEffect(() => {
    const checkConnectionAndSession = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const result = await testBackendConnection();
      setBackendConnected(result.success);
      
      if (result.success) {
        console.log('✅ [APP] Backend connection successful. Checking user session...');
        try {
          const user = await manifest.from('User').me();
          setCurrentUser(user);
          setCurrentScreen('dashboard');
        } catch (error) {
          console.log('ℹ️ [APP] No active user session.');
          setCurrentUser(null);
          setCurrentScreen('landing');
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', result.error);
      }
    };
    
    checkConnectionAndSession();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const user = await manifest.from('User').me();
      setCurrentUser(user);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };
  
  const handleSignup = async (name, email, password) => {
    try {
      await manifest.from('User').signup({ name, email, password });
      await handleLogin(email, password);
    } catch(error) {
      console.error('Signup failed:', error);
      alert('Signup failed. The email might already be in use.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setCurrentUser(null);
    setOnionVarieties([]);
    setCurrentScreen('landing');
  };

  const loadOnionVarieties = async () => {
    try {
      const response = await manifest.from('OnionVariety').find({ 
        include: ['owner'],
        sort: { createdAt: 'desc' }
      });
      setOnionVarieties(response.data);
    } catch(error) {
      console.error('Failed to load onion varieties:', error);
    }
  };

  const createOnionVariety = async (varietyData) => {
    try {
      const newVariety = await manifest.from('OnionVariety').create(varietyData);
      // Refetch to get the new item with its owner included
      loadOnionVarieties();
    } catch(error) {
      console.error('Failed to create onion variety:', error);
    }
  };

  const deleteOnionVariety = async(varietyId) => {
    try {
      await manifest.from('OnionVariety').delete(varietyId);
      setOnionVarieties(onionVarieties.filter(v => v.id !== varietyId));
    } catch(error) {
      console.error('Failed to delete onion variety:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`text-sm font-medium ${backendConnected ? 'text-gray-700' : 'text-red-700'}`}>
          {backendConnected ? 'Backend Connected' : 'Backend Disconnected'}
        </span>
      </div>
      
      {currentScreen === 'landing' ? (
        <LandingPage onLogin={handleLogin} onSignup={handleSignup} />
      ) : (
        <DashboardPage 
          user={currentUser} 
          onionVarieties={onionVarieties} 
          onLogout={handleLogout} 
          onLoadVarieties={loadOnionVarieties}
          onCreateVariety={createOnionVariety}
          onDeleteVariety={deleteOnionVariety}
        />
      )}
    </div>
  );
}

export default App;
