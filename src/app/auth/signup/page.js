"use client";
import React, { useState } from 'react';
import { auth } from '../../libs/utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Signup successful! You can now log in.');
      setError('');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-500 to-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Create Account</h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 cursor-pointer px-4 rounded hover:bg-gray-700 transition duration-300"
          >
            Signup
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Already have an account?</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="text-indigo-600 cursor-pointer hover:underline mt-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;