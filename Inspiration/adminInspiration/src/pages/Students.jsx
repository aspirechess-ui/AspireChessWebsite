import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Search,
  Filter,
  Save,
  X
} from 'lucide-react'

const Students = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    fetchStudents()
  }, [searchTerm, statusFilter])

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students/admin', {
        params: {
          search: searchTerm,
          status: statusFilter,
          limit: 100
        }
      })
      setStudents(response.data.data)
    } catch (error) {
      toast.error('Failed to fetch students')
      console.error('Error fetching students:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateOrUpdate = async (data) => {
    try {
      if (editingStudent) {
        await axios.put(`/api/students/${editingStudent._id}`, data)
        toast.success('Student updated successfully!')
      } else {
        await axios.post('/api/students', data)
        toast.success('Student created successfully!')
      }
      
      setShowModal(false)
      setEditingStudent(null)
      reset()
      fetchStudents()
    } catch (error) {
      const message = error.response?.data?.message || 'Operation failed'
      toast.error(message)
    }
  }

  const handleEdit = (student) => {
    setEditingStudent(student)
    reset({
      name: student.name,
      title: student.title,
      rating: student.rating,
      peakRating: student.peakRating,
      program: student.program,
      achievements: student.achievements.join('\n'),
      joinDate: student.joinDate,
      testimonial: student.testimonial,
      image: student.image,
      bio: student.bio
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this student?')) return
    
    try {
      await axios.delete(`/api/students/${id}`)
      toast.success('Student deleted successfully!')
      fetchStudents()
    } catch (error) {
      toast.error('Failed to delete student')
    }
  }

  const toggleStatus = async (id) => {
    try {
      await axios.patch(`/api/students/${id}/toggle-status`)
      toast.success('Student status updated!')
      fetchStudents()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const openCreateModal = () => {
    setEditingStudent(null)
    reset({
      name: '',
      title: '',
      rating: '',
      peakRating: '',
      program: '',
      achievements: '',
      joinDate: '',
      testimonial: '',
      image: '👨‍🎓',
      bio: ''
    })
    setShowModal(true)
  }

  const onSubmit = (data) => {
    // Convert achievements from textarea to array
    const formattedData = {
      ...data,
      achievements: data.achievements.split('\n').filter(a => a.trim())
    }
    handleCreateOrUpdate(formattedData)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
          <p className="text-gray-600">Manage student testimonials and profiles</p>
        </div>
        <button
          onClick={openCreateModal}
          className="btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search students..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              className="input-field"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="grid gap-6">
        {students.length > 0 ? (
          students.map((student) => (
            <div key={student._id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{student.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        student.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-blue-600 font-medium mb-1">{student.title}</p>
                    <p className="text-gray-600 mb-2">{student.program}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>Rating: {student.rating}</span>
                      <span>Peak: {student.peakRating}</span>
                      <span>Joined: {student.joinDate}</span>
                    </div>
                    <p className="text-gray-700 italic">"{student.testimonial}"</p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">{student.bio}</p>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Achievements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {student.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleStatus(student._id)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title={student.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {student.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => handleEdit(student)}
                    className="p-2 text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="p-2 text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-500">No students found</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingStudent ? 'Edit Student' : 'Add New Student'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className="input-field"
                      placeholder="Student name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      {...register('title', { required: 'Title is required' })}
                      className="input-field"
                      placeholder="e.g., FIDE Master, National Champion"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Rating *
                    </label>
                    <input
                      {...register('rating', { required: 'Rating is required' })}
                      className="input-field"
                      placeholder="e.g., 2380"
                    />
                    {errors.rating && (
                      <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Peak Rating *
                    </label>
                    <input
                      {...register('peakRating', { required: 'Peak rating is required' })}
                      className="input-field"
                      placeholder="e.g., 2400"
                    />
                    {errors.peakRating && (
                      <p className="text-red-500 text-sm mt-1">{errors.peakRating.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Program *
                    </label>
                    <input
                      {...register('program', { required: 'Program is required' })}
                      className="input-field"
                      placeholder="e.g., Elite Training Program"
                    />
                    {errors.program && (
                      <p className="text-red-500 text-sm mt-1">{errors.program.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Join Date *
                    </label>
                    <input
                      {...register('joinDate', { required: 'Join date is required' })}
                      className="input-field"
                      placeholder="e.g., January 2023"
                    />
                    {errors.joinDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.joinDate.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image Emoji
                    </label>
                    <input
                      {...register('image')}
                      className="input-field"
                      placeholder="👨‍🎓"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Achievements * (one per line)
                  </label>
                  <textarea
                    {...register('achievements', { required: 'At least one achievement is required' })}
                    className="input-field"
                    rows="4"
                    placeholder="Gained 400 rating points in 18 months&#10;FIDE Master title achieved&#10;Regional Championship Winner"
                  />
                  {errors.achievements && (
                    <p className="text-red-500 text-sm mt-1">{errors.achievements.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Testimonial *
                  </label>
                  <textarea
                    {...register('testimonial', { required: 'Testimonial is required' })}
                    className="input-field"
                    rows="3"
                    placeholder="Student's testimonial about their experience..."
                  />
                  {errors.testimonial && (
                    <p className="text-red-500 text-sm mt-1">{errors.testimonial.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio *
                  </label>
                  <textarea
                    {...register('bio', { required: 'Bio is required' })}
                    className="input-field"
                    rows="3"
                    placeholder="Brief biography of the student..."
                  />
                  {errors.bio && (
                    <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingStudent ? 'Update' : 'Create'} Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Students