import React from 'react';
import { User, Mail, Phone, Edit2 } from 'lucide-react';

const PersonalInfoTab = ({ profileData, editingSection, formData, handleInputChange, startEditing, cancelEditing, saveChanges }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        {editingSection !== 'personal' && (
          <button 
            onClick={() => startEditing('personal')}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </button>
        )}
      </div>
      
      {editingSection === 'personal' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
         
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={cancelEditing}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => saveChanges('personal')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-start">
            <User className="h-5 w-5 text-gray-500 mt-1 mr-4" />
            <div>
              <h3 className="text-sm font-medium text-gray-500 text-left">Full Name</h3>
              <p className="text-base">{profileData.firstName} {profileData.lastName}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Mail className="h-5 w-5 text-gray-500 mt-1 mr-4" />
            <div>
              <h3 className="text-sm font-medium text-gray-500 text-left">Email Address</h3>
              <p className="text-base">{profileData.email}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Phone className="h-5 w-5 text-gray-500 mt-1 mr-4" />
            <div>
              <h3 className="text-sm font-medium text-gray-500 text-left">Phone Number</h3>
              <p className="text-base">{profileData.phone}</p>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default PersonalInfoTab;