import React from 'react';
import { User, Lock, LogOut } from 'lucide-react';

function Avatar({ n }) {
  return (
    <div className="w-32 h-32 bg-indigo-200 rounded-full flex items-center justify-center">
      <span className="font-medium text-white-700 text-4xl">{n}</span>
    </div>
  );
}

function Sidebar({ profileData, activeTab, setActiveTab }) {
  return (
    <div className="md:w-1/4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Profile Summary */}
        <div className="p-6 text-center border-b border-gray-200">
          <div className="relative mx-auto mb-4 flex justify-center">
            <Avatar n={profileData.firstName?.charAt(0) || '?'} />
          </div>
          <h2 className="text-xl font-bold">{profileData.firstName} {profileData.lastName}</h2>
          <p className="text-gray-600">{profileData.email}</p>
        </div>
        
        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                  activeTab === 'profile' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="h-5 w-5 mr-3" />
                Personal Information
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('security')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                  activeTab === 'security' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Lock className="h-5 w-5 mr-3" />
                Security
              </button>
            </li>
          </ul>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="w-full text-left px-4 py-2 rounded-lg flex items-center text-gray-700 hover:bg-gray-100">
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
