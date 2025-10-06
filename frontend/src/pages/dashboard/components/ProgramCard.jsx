import React from 'react';
import { Edit2, Trash2, ToggleLeft, ToggleRight, MapPin, Clock, Users, Phone } from 'lucide-react';

const ProgramCard = ({ program, onEdit, onDelete, onToggleStatus }) => {
  const getColorClasses = (colorTheme) => {
    const colorMap = {
      green: {
        bg: 'from-green-500 to-emerald-600',
        border: 'border-green-500/30',
        text: 'text-green-400'
      },
      blue: {
        bg: 'from-blue-500 to-cyan-600',
        border: 'border-cyan-500/30',
        text: 'text-cyan-400'
      },
      purple: {
        bg: 'from-purple-500 to-violet-600',
        border: 'border-purple-500/30',
        text: 'text-purple-400'
      },
      orange: {
        bg: 'from-orange-500 to-red-600',
        border: 'border-orange-500/30',
        text: 'text-orange-400'
      },
      red: {
        bg: 'from-red-500 to-pink-600',
        border: 'border-red-500/30',
        text: 'text-red-400'
      },
      indigo: {
        bg: 'from-indigo-500 to-blue-600',
        border: 'border-indigo-500/30',
        text: 'text-indigo-400'
      },
      pink: {
        bg: 'from-pink-500 to-rose-600',
        border: 'border-pink-500/30',
        text: 'text-pink-400'
      },
      yellow: {
        bg: 'from-yellow-500 to-orange-600',
        border: 'border-yellow-500/30',
        text: 'text-yellow-400'
      }
    };
    return colorMap[colorTheme] || colorMap.blue;
  };

  const colors = getColorClasses(program.colorTheme);

  return (
    <div className={`bg-black/50 rounded-lg shadow-md border ${colors.border} p-6 hover:shadow-lg transition-shadow duration-200 ${!program.isActive ? 'opacity-60 bg-black/30' : ''}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className={`inline-block bg-gradient-to-r ${colors.bg} text-white px-3 py-1 rounded-full text-sm font-semibold mb-2`}>
            {program.branch}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{program.branch}</h3>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {program.location}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => onToggleStatus(program._id)}
            className={`p-2 rounded-lg transition-colors ${
              program.isActive 
                ? 'text-green-600 hover:bg-green-50' 
                : 'text-gray-400 hover:bg-gray-50'
            }`}
            title={program.isActive ? 'Deactivate' : 'Activate'}
          >
            {program.isActive ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
          </button>
          <button
            onClick={() => onEdit(program)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(program._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* WhatsApp Number */}
      <div className="flex items-center text-gray-600 text-sm mb-4">
        <Phone className="h-4 w-4 mr-1" />
        <span>WhatsApp: {program.whatsappNumber}</span>
      </div>

      {/* Batches */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Batches & Schedule</h4>
        <div className="space-y-2">
          {program.batches.map((batch, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className={`font-medium ${colors.text}`}>{batch.type}</span>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {batch.schedule}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {batch.slots.map((slot, slotIndex) => (
                  <div key={slotIndex} className="bg-white rounded p-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">{slot.time}</span>
                      <span className="text-gray-600">{slot.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Features</h4>
        <div className="flex flex-wrap gap-2">
          {program.features.map((feature, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Status: {program.isActive ? 'Active' : 'Inactive'}</span>
        <span>Order: {program.displayOrder}</span>
      </div>
    </div>
  );
};

export default ProgramCard;