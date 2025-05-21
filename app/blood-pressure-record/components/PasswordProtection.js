'use client';

import { useState, useEffect } from 'react';

export default function PasswordProtection({ onUnlock, isUnlocked }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    // Check if already unlocked in localStorage
    const storedUnlockState = localStorage.getItem('bp_records_unlocked');
    if (storedUnlockState === 'true') {
      onUnlock(true);
    }
  }, [onUnlock]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/blood-pressure-record/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('bp_records_unlocked', 'true');
        onUnlock(true);
        setError('');
      } else {
        setAttempts(prev => prev + 1);        setError('Incorrect password');
        setPassword('');
        
        // If too many attempts, show a more detailed error
        if (attempts >= 2) {
          setError('Too many incorrect attempts. Please try again later.');
        }
      }
    } catch (error) {      console.error('Error validating password:', error);
      setError('Error validating password. Please try again later.');
    }
  };

  if (isUnlocked) return null;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-base-100 rounded-lg shadow-lg p-8">        <h2 className="text-2xl font-bold mb-6 text-center">Enter Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <input
              type="password"
              placeholder="Enter password to view records"
              className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={attempts >= 3}
            />
            {error && (
              <label className="label">
                <span className="label-text-alt text-error">{error}</span>
              </label>
            )}
          </div>
          <button 
            type="submit"            className="btn btn-primary w-full"
            disabled={!password || attempts >= 3}
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
}
