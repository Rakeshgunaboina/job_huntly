// src/App.js
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import PrivateRoute from './components/Auth/PrivateRoute';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './components/Jobs/JobDetails';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import RecruiterDashboard from './components/Dashboard/RecruiterDashboard';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import './styles/main.scss';
import ApplyForm from './pages/ApplyForm';
import PostJob from './pages/PostJob';
import ManageJobs from './pages/ManageJobs';
import EditJob from './pages/EditJob';

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <div className="app-layout">
          <Navbar />
          <div className="content-wrapper">
            {/* <Sidebar /> */}
            <main className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/jobs/:id/apply" element={<ApplyForm />} />
                <Route path="/post-job" element={<PostJob />} />
                <Route path="/manage-jobs" element={<ManageJobs />} />
                <Route path="/edit-job/:id" element={<EditJob />} />
                
                
                

                {/* 404 Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;