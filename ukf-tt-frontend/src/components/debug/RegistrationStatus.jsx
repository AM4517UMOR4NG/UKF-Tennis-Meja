import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../api';
import { shouldUseMockAPI } from '../../utils/mockApi';

export default function RegistrationStatus() {
  const [status, setStatus] = useState({
    apiMode: shouldUseMockAPI() ? 'Mock API' : 'Real API',
    apiUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
    isConnected: false,
    lastChecked: null,
    error: null
  });

  const checkAPIConnection = async () => {
    try {
      setStatus(prev => ({ ...prev, error: null }));
      
      if (shouldUseMockAPI()) {
        setStatus(prev => ({
          ...prev,
          isConnected: true,
          lastChecked: new Date().toLocaleTimeString(),
          error: null
        }));
        return;
      }

      // Test real API connection
      const response = await api.get('/health');
      setStatus(prev => ({
        ...prev,
        isConnected: true,
        lastChecked: new Date().toLocaleTimeString(),
        error: null
      }));
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        isConnected: false,
        lastChecked: new Date().toLocaleTimeString(),
        error: error.message
      }));
    }
  };

  useEffect(() => {
    checkAPIConnection();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 z-50 bg-gray-900/90 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-xs text-white max-w-xs"
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-cyan-400">🔧 Registration Debug</h4>
        <button
          onClick={checkAPIConnection}
          className="text-gray-400 hover:text-white transition-colors"
        >
          🔄
        </button>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-400">Mode:</span>
          <span className={status.apiMode === 'Mock API' ? 'text-yellow-400' : 'text-green-400'}>
            {status.apiMode}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">API URL:</span>
          <span className="text-gray-300 truncate ml-2">{status.apiUrl}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Status:</span>
          <span className={status.isConnected ? 'text-green-400' : 'text-red-400'}>
            {status.isConnected ? '✅ Connected' : '❌ Disconnected'}
          </span>
        </div>
        
        {status.lastChecked && (
          <div className="flex justify-between">
            <span className="text-gray-400">Last Check:</span>
            <span className="text-gray-300">{status.lastChecked}</span>
          </div>
        )}
        
        {status.error && (
          <div className="mt-2 p-2 bg-red-900/30 border border-red-500/30 rounded text-red-300">
            <div className="font-medium">Error:</div>
            <div className="text-xs">{status.error}</div>
          </div>
        )}
        
        <div className="mt-3 pt-2 border-t border-gray-600/50">
          <div className="text-gray-400 text-xs">
            {status.apiMode === 'Mock API' ? (
              <span>📝 Using mock data for testing</span>
            ) : (
              <span>🌐 Connected to real backend</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
