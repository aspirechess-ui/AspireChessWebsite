import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import ProgramCard from '../components/ProgramCard';
import api from '../../../utils/api';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  // Form state
  const [formData, setFormData] = useState({
    branch: '',
    location: '',
    batches: [
      {
        type: 'Weekday Batch',
        schedule: 'Monday & Thursday',
        slots: [
          { time: '8-9 AM', level: 'Beginner Level' },
          { time: '9-10 AM', level: 'Advanced Level' }
        ]
      },
      {
        type: 'Weekend Batch',
        schedule: 'Saturday & Sunday',
        slots: [
          { time: '8-9 AM', level: 'Beginner Level' },
          { time: '9-10 AM', level: 'Advanced Level' }
        ]
      }
    ],
    features: [''],
    colorTheme: 'blue',
    whatsappNumber: '+917039184939',
    displayOrder: 0,
    isActive: true
  });

  const colorOptions = [
    { value: 'green', label: 'Green', class: 'bg-green-500' },
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
    { value: 'red', label: 'Red', class: 'bg-red-500' },
    { value: 'indigo', label: 'Indigo', class: 'bg-indigo-500' },
    { value: 'pink', label: 'Pink', class: 'bg-pink-500' },
    { value: 'yellow', label: 'Yellow', class: 'bg-yellow-500' }
  ];

  useEffect(() => {
    fetchPrograms();
  }, [searchTerm, statusFilter, pagination.currentPage]);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError('');
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: 9,
        search: searchTerm,
        status: statusFilter
      });

      console.log('Fetching programs with URL:', `/api/programs/admin?${params}`);
      const response = await api.get(`/api/programs/admin?${params}`);
      console.log('Programs response:', response.data);
      
      setPrograms(response.data.data || []);
      setPagination({
        currentPage: response.data.currentPage || 1,
        totalPages: response.data.totalPages || 1,
        total: response.data.total || 0
      });
    } catch (err) {
      console.error('Fetch programs error:', err);
      const errorMessage = err.response?.status === 404 
        ? 'Programs endpoint not found. Please ensure the backend is running.'
        : err.response?.status === 401
        ? 'Unauthorized. Please log in again.'
        : err.response?.status === 500
        ? 'Server error. Please try again later.'
        : err.code === 'NETWORK_ERROR' || err.message.includes('Network Error')
        ? 'Unable to connect to server. Please check your connection.'
        : 'Unable to load programs. Please try again.';
      setError(errorMessage);
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    const errors = [];
    
    if (!formData.branch.trim()) {
      errors.push('Branch name is required');
    }
    
    if (!formData.location.trim()) {
      errors.push('Location is required');
    }
    
    if (!formData.whatsappNumber.trim()) {
      errors.push('WhatsApp number is required');
    } else if (!/^\+\d{1,4}\d{10}$/.test(formData.whatsappNumber.trim())) {
      errors.push('WhatsApp number must be in format +countrycode followed by 10 digits');
    }
    
    const cleanedFeatures = formData.features.filter(feature => feature.trim() !== '');
    if (cleanedFeatures.length === 0) {
      errors.push('At least one feature is required');
    }
    
    // Validate batches
    for (let i = 0; i < formData.batches.length; i++) {
      const batch = formData.batches[i];
      if (!batch.type.trim()) {
        errors.push(`Batch ${i + 1}: Type is required`);
      }
      if (!batch.schedule.trim()) {
        errors.push(`Batch ${i + 1}: Schedule is required`);
      }
      for (let j = 0; j < batch.slots.length; j++) {
        const slot = batch.slots[j];
        if (!slot.time.trim()) {
          errors.push(`Batch ${i + 1}, Slot ${j + 1}: Time is required`);
        }
        if (!slot.level.trim()) {
          errors.push(`Batch ${i + 1}, Slot ${j + 1}: Level is required`);
        }
      }
    }
    
    if (errors.length > 0) {
      setError(errors.join('. '));
      setTimeout(() => setError(''), 5000);
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Clean form data
      const cleanedFormData = {
        ...formData,
        branch: formData.branch.trim(),
        location: formData.location.trim(),
        whatsappNumber: formData.whatsappNumber.trim(),
        features: cleanedFeatures,
        batches: formData.batches.map(batch => ({
          ...batch,
          type: batch.type.trim(),
          schedule: batch.schedule.trim(),
          slots: batch.slots.map(slot => ({
            time: slot.time.trim(),
            level: slot.level.trim()
          }))
        }))
      };

      console.log('Submitting program data:', cleanedFormData);

      if (editingProgram) {
        const response = await api.put(`/api/programs/${editingProgram._id}`, cleanedFormData);
        console.log('Update response:', response.data);
        setSuccess('Program updated successfully!');
      } else {
        const response = await api.post('/api/programs', cleanedFormData);
        console.log('Create response:', response.data);
        setSuccess('Program created successfully!');
      }

      setShowModal(false);
      setEditingProgram(null);
      resetForm();
      fetchPrograms();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Submit error:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.errors?.map(e => e.message).join('. ') ||
                          'Failed to save program. Please check all fields and try again.';
      setError(errorMessage);
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (program) => {
    setEditingProgram(program);
    setFormData({
      branch: program.branch,
      location: program.location,
      batches: program.batches,
      features: program.features.length > 0 ? program.features : [''],
      colorTheme: program.colorTheme,
      whatsappNumber: program.whatsappNumber,
      displayOrder: program.displayOrder,
      isActive: program.isActive
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this program?')) return;

    try {
      await api.delete(`/api/programs/${id}`);
      setSuccess('Program deleted successfully!');
      fetchPrograms();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete program');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await api.patch(`/api/programs/${id}/toggle-status`);
      setSuccess('Program status updated!');
      fetchPrograms();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update program status');
      setTimeout(() => setError(''), 3000);
    }
  };

  const resetForm = () => {
    setFormData({
      branch: '',
      location: '',
      batches: [
        {
          type: 'Weekday Batch',
          schedule: 'Monday & Thursday',
          slots: [
            { time: '8-9 AM', level: 'Beginner Level' },
            { time: '9-10 AM', level: 'Advanced Level' }
          ]
        },
        {
          type: 'Weekend Batch',
          schedule: 'Saturday & Sunday',
          slots: [
            { time: '8-9 AM', level: 'Beginner Level' },
            { time: '9-10 AM', level: 'Advanced Level' }
          ]
        }
      ],
      features: [''],
      colorTheme: 'blue',
      whatsappNumber: '+917039184939',
      displayOrder: 0,
      isActive: true
    });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: newFeatures.length > 0 ? newFeatures : ['']
    });
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures
    });
  };

  const addBatchSlot = (batchIndex) => {
    const newBatches = [...formData.batches];
    newBatches[batchIndex].slots.push({ time: '', level: '' });
    setFormData({
      ...formData,
      batches: newBatches
    });
  };

  const removeBatchSlot = (batchIndex, slotIndex) => {
    const newBatches = [...formData.batches];
    newBatches[batchIndex].slots = newBatches[batchIndex].slots.filter((_, i) => i !== slotIndex);
    setFormData({
      ...formData,
      batches: newBatches
    });
  };

  const updateBatchSlot = (batchIndex, slotIndex, field, value) => {
    const newBatches = [...formData.batches];
    newBatches[batchIndex].slots[slotIndex][field] = value;
    setFormData({
      ...formData,
      batches: newBatches
    });
  };

  const updateBatch = (batchIndex, field, value) => {
    const newBatches = [...formData.batches];
    newBatches[batchIndex][field] = value;
    setFormData({
      ...formData,
      batches: newBatches
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Programs Management</h1>
          <p className="text-gray-600">Manage chess training programs and branches</p>
        </div>
        <button
          onClick={() => {
            setEditingProgram(null);
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Program
        </button>
      </div>

      {/* Alerts */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <XCircle className="h-5 w-5" />
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Programs</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>

          <div className="text-sm text-gray-600 flex items-center">
            Total: {pagination.total} programs
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : programs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <ProgramCard
              key={program._id}
              program={program}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No programs found</h3>
          <p className="text-gray-600">Get started by creating your first program.</p>
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center">
          <nav className="flex space-x-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setPagination({ ...pagination, currentPage: page })}
                className={`px-3 py-2 rounded-lg ${
                  pagination.currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/80 bg-opacity-70 flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
              setEditingProgram(null);
              resetForm();
            }
          }}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit} className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {editingProgram ? 'Edit Program' : 'Create New Program'}
              </h2>

              {/* Form Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                  <XCircle className="h-5 w-5" />
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Branch Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        !formData.branch.trim() && error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Kalamboli Branch"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        !formData.location.trim() && error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Main Branch"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        (!formData.whatsappNumber.trim() || !/^\+\d{1,4}\d{10}$/.test(formData.whatsappNumber.trim())) && error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="+917039184939"
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: +countrycode followed by 10 digits</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color Theme <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, colorTheme: color.value })}
                          className={`p-2 rounded-lg border-2 transition-colors ${
                            formData.colorTheme === color.value
                              ? 'border-gray-800'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-full h-6 rounded ${color.class}`}></div>
                          <div className="text-xs mt-1">{color.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.displayOrder}
                      onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Features <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => updateFeature(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., Personal coach assignment"
                          />
                          {formData.features.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addFeature}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        + Add Feature
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Batches */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Batches & Schedules <span className="text-red-500">*</span>
                </label>
                <div className="space-y-4">
                  {formData.batches.map((batch, batchIndex) => (
                    <div key={batchIndex} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Batch Type
                          </label>
                          <input
                            type="text"
                            value={batch.type}
                            onChange={(e) => updateBatch(batchIndex, 'type', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., Weekday Batch"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Schedule
                          </label>
                          <input
                            type="text"
                            value={batch.schedule}
                            onChange={(e) => updateBatch(batchIndex, 'schedule', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., Monday & Thursday"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Time Slots
                        </label>
                        <div className="space-y-2">
                          {batch.slots.map((slot, slotIndex) => (
                            <div key={slotIndex} className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={slot.time}
                                onChange={(e) => updateBatchSlot(batchIndex, slotIndex, 'time', e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., 8-9 AM"
                              />
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={slot.level}
                                  onChange={(e) => updateBatchSlot(batchIndex, slotIndex, 'level', e.target.value)}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="e.g., Beginner Level"
                                />
                                {batch.slots.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeBatchSlot(batchIndex, slotIndex)}
                                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  >
                                    ×
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addBatchSlot(batchIndex)}
                            className="text-blue-600 hover:text-blue-700 text-sm"
                          >
                            + Add Time Slot
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="mt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700">Active (visible to public)</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProgram(null);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  {loading ? 'Saving...' : editingProgram ? 'Update Program' : 'Create Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Programs;