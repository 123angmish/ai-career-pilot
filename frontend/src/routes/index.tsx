import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Lazy load pages for modular performance
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ResumeUpload from '../pages/ResumeUpload';
import ResumeAnalysis from '../pages/ResumeAnalysis';
import JdMatch from '../pages/JdMatch';
import CoverLetter from '../pages/CoverLetter';
import InterviewQuestions from '../pages/InterviewQuestions';
import MockInterview from '../pages/MockInterview';
import AiChat from '../pages/AiChat';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import ResumeBuilder from '../pages/ResumeBuilder';
import CareerPath from '../pages/CareerPath';
import ServicesHub from '../pages/ServicesHub';
import LinkedInEnhancer from '../pages/LinkedInEnhancer';
import CoursesCertification from '../pages/CoursesCertification';
import GlobalCareers from '../pages/GlobalCareers';
import JobTrackerPage from '../pages/JobTrackerPage';
import Error404 from '../pages/Error404';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error404 />,
  },
  // Public Auth Routes
  {
    element: <AuthLayout />,
    errorElement: <Error404 />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  // Protected Admin/Dashboard Routes
  {
    element: <ProtectedRoute />,
    errorElement: <Error404 />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'resumes/upload',
            element: <ResumeUpload />,
          },
          {
            path: 'resumes/builder',
            element: <ResumeBuilder />,
          },
          {
            path: 'resumes/analysis',
            element: <ResumeAnalysis />,
          },
          {
            path: 'resumes/jd-match',
            element: <JdMatch />,
          },
          {
            path: 'cover-letter',
            element: <CoverLetter />,
          },
          {
            path: 'job-tracker',
            element: <JobTrackerPage />,
          },
          {
            path: 'interview/questions',
            element: <InterviewQuestions />,
          },
          {
            path: 'interview/mock',
            element: <MockInterview />,
          },
          {
            path: 'career-path',
            element: <CareerPath />,
          },
          {
            path: 'services',
            element: <ServicesHub />,
          },
          {
            path: 'services/linkedin',
            element: <LinkedInEnhancer />,
          },
          {
            path: 'services/courses',
            element: <CoursesCertification />,
          },
          {
            path: 'services/global-careers',
            element: <GlobalCareers />,
          },
          {
            path: 'chat',
            element: <AiChat />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
        ],
      },
    ],
  },
  // Fallback Catch All
  {
    path: '*',
    element: <Error404 />,
  },
]);
