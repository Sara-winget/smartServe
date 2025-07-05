import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    return(
        navigate('/')
    )
    console.log('Login submitted:', { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login to Your Account</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-600" htmlFor="email">Email</label>
            <div className="flex items-center border rounded-xl px-3 py-2">
              <FiMail className="text-gray-500 mr-2" />
              <input
                type="email"
                id="email"
                className="w-full focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-gray-600" htmlFor="password">Password</label>
            <div className="flex items-center border rounded-xl px-3 py-2">
              <FiLock className="text-gray-500 mr-2" />
              <input
                type="password"
                id="password"
                className="w-full focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?
          <Link to="/signup" className="text-blue-600 hover:underline ml-1">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
