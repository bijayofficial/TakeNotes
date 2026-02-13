import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import MyFiles from "../pages/dashboard/MyFiles";
import Profile from "../pages/dashboard/Profile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/auth/ProtectedRoute";


const AppRoutes = () => {
  // console.log(Routes);

  return (
    <Routes>
       <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/files" element={<MyFiles />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
