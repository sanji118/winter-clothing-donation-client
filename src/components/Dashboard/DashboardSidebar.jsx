import React from 'react';
import { FiHome, FiUser, FiDollarSign, FiCalendar, FiUsers, FiSettings, FiAward } from 'react-icons/fi';

const Sidebar = ({ activeTab, setActiveTab, userRole, handleLogout }) => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="flex items-center h-16 px-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="flex flex-col flex-grow overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                activeTab === 'overview' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiHome className="mr-3 h-5 w-5" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                activeTab === 'profile' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiUser className="mr-3 h-5 w-5" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('donations')}
              className={`flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                activeTab === 'donations' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiDollarSign className="mr-3 h-5 w-5" />
              Donations
            </button>
            {(userRole === 'volunteer' || userRole === 'admin') && (
              <button
                onClick={() => setActiveTab('events')}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                  activeTab === 'events' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiCalendar className="mr-3 h-5 w-5" />
                Events
              </button>
            )}
            {userRole === 'admin' && (
              <>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                    activeTab === 'users' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiUsers className="mr-3 h-5 w-5" />
                  User Management
                </button>
                <button
                  onClick={() => setActiveTab('campaigns')}
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                    activeTab === 'campaigns' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiAward className="mr-3 h-5 w-5" />
                  Campaigns
                </button>
              </>
            )}
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                activeTab === 'settings' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiSettings className="mr-3 h-5 w-5" />
              Settings
            </button>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;