import React, { useState } from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin, onSignup }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginView) {
      onLogin(email, password);
    } else {
      onSignup(name, email, password);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-900 mb-4">Onion Encyclopedia</h1>
          <p className="text-xl text-yellow-800 mb-6">Your collaborative guide to the world of onions. Discover, share, and learn about different varieties.</p>
           <a 
            href={`${config.BACKEND_URL}/admin`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
          >
            Access Admin Panel
          </a>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">{isLoginView ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-center text-gray-500 mb-6">{isLoginView ? 'Sign in to continue' : 'Join the community!'}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginView && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
              required
            />
            <button type="submit" className="w-full bg-yellow-600 text-white p-3 rounded-lg font-semibold hover:bg-yellow-700 transition duration-300">
              {isLoginView ? 'Log In' : 'Sign Up'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            {isLoginView ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={() => setIsLoginView(!isLoginView)} className="font-semibold text-yellow-700 hover:underline ml-1">
              {isLoginView ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
