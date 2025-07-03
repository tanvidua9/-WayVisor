import React from 'react';
import { Users, Edit2, X } from 'lucide-react';

const DependentsTab = ({ dependents, addDependent, deleteDependent, formatDate }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dependents</h2>
          <p className="text-gray-600 mt-1">Manage family members and travel companions</p>
        </div>
        <button 
          onClick={addDependent}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
        >
          <span className="mr-1">+</span> Add Dependent
        </button>
      </div>
      
      {dependents.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No dependents added yet</h3>
          <p className="text-gray-500">Add family members or travel companions to make booking easier</p>
        </div>
      ) : (
        <div className="space-y-4">
          {dependents.map((dependent) => (
            <div key={dependent.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-medium">{dependent.name}</h3>
                <div className="text-sm text-gray-600">
                  <span className="mr-4">{dependent.relationship}</span>
                  <span>DOB: {formatDate(dependent.dob)}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-indigo-600 rounded-md hover:bg-gray-100">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => deleteDependent(dependent.id)}
                  className="p-2 text-gray-500 hover:text-red-600 rounded-md hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DependentsTab;