# Aspire Chess Academy

A full-stack web application for a chess academy featuring a public website and admin dashboard.

## 🚀 Features

### Public Website
- **Home Page**: Hero section with academy introduction and statistics
- **About Page**: Academy philosophy, history timeline, and facilities
- **Programs Page**: Training programs for different skill levels (Kalamboli, Kamothe, Roadpali branches + Online)
- **Students Page**: Student testimonials and success stories
- **Tournaments Page**: Upcoming and past tournaments with registration
- **Contact Page**: Contact form, information, and FAQ

### Admin Dashboard
- **Dashboard**: Overview with statistics and recent activity
- **Student Management**: Add, edit, delete, and manage student testimonials
- **Tournament Management**: Create and manage chess tournaments
- **Authentication**: Secure login system for admin access

> **Note**: This is a simple admin dashboard for posting data like student testimonials and tournaments. The layout and navigation are handled by the main layouts folder.

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **React Router Dom** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **CORS** - Cross-origin requests

## 📁 Project Structure

```
aspire-chess-academy/
├── frontend/
│   ├── src/
│   │   ├── layouts/
│   │   │   ├── PublicLayout.jsx
│   │   │   └── DashboardLayout.jsx
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   │   ├── pages/
│   │   │   │   └── components/
│   │   │   └── dashboard/
│   │   │       ├── pages/
│   │   │       ├── components/ (ProtectedRoute only)
│   │   │       └── contexts/
│   │   ├── App.jsx
│   │   └── AppRoutes.jsx
│   └── package.json
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aspire-chess-academy
   ```

2. **Install dependencies for all packages**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Create `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/aspire-chess-academy
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both frontend (http://localhost:5174) and backend (http://localhost:5000) concurrently.

### Individual Commands

- **Start backend only**: `npm run backend`
- **Start frontend only**: `npm run frontend`
- **Build frontend**: `npm run build`
- **Start production**: `npm start`

## 🔐 Admin Access

### Default Admin Credentials
- **Email**: admin@aspirechess.com
- **Password**: admin123456

### Admin Dashboard Routes
- `/dashboard/login` - Admin login
- `/dashboard` - Main dashboard
- `/dashboard/students` - Student management
- `/dashboard/tournaments` - Tournament management

## 🎨 Design Features

### Public Website
- **Dark theme** with cyan and purple gradients
- **Animated chess pieces** and floating particles
- **Responsive design** for all screen sizes
- **Smooth animations** with Framer Motion
- **Chess-themed styling** with Orbitron font

### Admin Dashboard
- **Clean, professional interface**
- **Sidebar navigation**
- **Data tables** with search and filters
- **Modal forms** for CRUD operations
- **Toast notifications** for user feedback

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-password` - Change password

### Students
- `GET /api/students` - Get public students
- `GET /api/students/admin` - Get all students (admin)
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `PATCH /api/students/:id/toggle-status` - Toggle active status

### Tournaments
- `GET /api/tournaments` - Get public tournaments
- `GET /api/tournaments/admin` - Get all tournaments (admin)
- `POST /api/tournaments` - Create tournament
- `PUT /api/tournaments/:id` - Update tournament
- `DELETE /api/tournaments/:id` - Delete tournament
- `PATCH /api/tournaments/:id/toggle-status` - Toggle active status
- `PATCH /api/tournaments/:id/complete` - Mark as completed
- `PATCH /api/tournaments/:id/participants` - Update participant count

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `dist` folder to your hosting service
3. Set environment variables for API URL

### Backend (Railway/Heroku)
1. Set environment variables
2. Deploy the backend folder
3. Ensure MongoDB connection is configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🎯 Future Enhancements

- [ ] User registration for students
- [ ] Online chess game integration
- [ ] Payment gateway for tournaments
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Multi-language support

---

**Aspire Chess Academy** - Where strategy meets excellence! ♔