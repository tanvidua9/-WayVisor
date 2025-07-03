import React, { useState, useEffect } from 'react';
import Sidebar from "../components/sidebar";
import PersonalInfoTab from '../components/personalInfoTab';
import SecurityTab from '../components/securityTab';
import Header from '../components/header';

function Account() {
  const [activeTab, setActiveTab] = useState('profile');  
  const [editingSection, setEditingSection] = useState(null);  
  
  // Mock profile data
  const [profileData, setProfileData] = useState({
    firstName: 'Ritesh',
    lastName: 'Ranjan',
    email: 'ranjan.ritesh21102003@gmail.com',
    phone: '+91 9508381490',
    });
  
  const [formData, setFormData] = useState({...profileData});

  const startEditing = (section) => {
    setEditingSection(section);
    setFormData({...profileData});
  };
  
  const cancelEditing = () => {
    setEditingSection(null);
  };
  
  const saveChanges = (section) => {
    if (section === 'personal') {
      setProfileData({...profileData, ...formData});
    }
    setEditingSection(null);
  };
  
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setProfileData({
        ...profileData        
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
    

  return (
    <div className="min-h-screen bg-gray-50" style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      margin: 0,
      padding: 0,
      overflow: "auto"
    }}>

      <div className="bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">My Profile</h2>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar 
            profileData={profileData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          
          <div className="md:w-3/4">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              
              {activeTab === 'profile' && (
                <PersonalInfoTab 
                  profileData={profileData}
                  editingSection={editingSection}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  startEditing={startEditing}
                  cancelEditing={cancelEditing}
                  saveChanges={saveChanges}
                />
              )}
              
              {activeTab === 'security' && <SecurityTab />}              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
