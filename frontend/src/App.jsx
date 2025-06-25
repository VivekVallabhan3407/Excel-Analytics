
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Settings from './pages/Settings';
import Terms from './pages/Terms';
import About from './pages/About';

import Dashboard from './pages/DashBoard';
import UploadFile from './pages/UploadFile';
import AnalyzeData from './pages/AnalyzeData';
import ChartHistory from './pages/ChartHistory';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
// import AIInsights from './pages/AIInsights'; // keep empty for now
import { AuthProvider } from './contexts/authContext';


import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashBoardLayout from './components/layout/DashBoardLayout';

function App() {
  return (

    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
              {/* Public routes */}
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Home />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/signup"
                element={
                  <>
                    <Navbar />
                    <Signup />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    <Navbar />
                    <Login />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <>
                    <Navbar />
                    <ForgotPassword />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/reset-password/:token"
                element={
                  <>
                    <Navbar />
                    <ResetPassword />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <Navbar />
                    <About />
                    <Footer />
                  </>
                }
              />
              {/* Protected Routes (inside DashBoardLayout) */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashBoardLayout>
                      <Dashboard />
                    </DashBoardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute >
                    <DashBoardLayout>
                      <UploadFile />
                    </DashBoardLayout>
                  </ProtectedRoute >
                }
              />
              <Route
                path="/analyze"
                element={
                  <ProtectedRoute>
                    <DashBoardLayout>
                      <AnalyzeData />
                    </DashBoardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <DashBoardLayout>
                      <ChartHistory />
                    </DashBoardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <DashBoardLayout>
                      <Settings />
                    </DashBoardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <DashBoardLayout>
                      <AdminPanel />
                    </DashBoardLayout>
                  </ProtectedRoute>
                }
              />

              {/* <Route
                path="/insights"
                element={
                  <ProtectedRoute>
                    <DashBoardLayout>
                      <AIInsights />
                    </DashBoardLayout>
                  </ProtectedRoute>
                }
              /> */}
              <Route
                path="/terms"
                element={
                  <ProtectedRoute>
                    <DashBoardLayout>
                      <Terms />
                    </DashBoardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <DashBoardLayout>
                      <Profile />
                    </DashBoardLayout>
                  </ProtectedRoute>
                }
              />

            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>

  );
}

export default App;
