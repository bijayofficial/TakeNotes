// // function App() {
// //   return (
// //     <div className="bg-red-500 h-screen flex items-center justify-center">
// //       <h1 className="text-white text-4xl">HELLO</h1>
// //     </div>
// //   );
// // }


// // export default App;
// import { Routes, Route } from "react-router-dom";
// import Register from "./pages/auth/Register";
// import Login from "./pages/auth/Login";
// import Dashboard from "./pages/dashboard/Dashboard";
// import Profile from "./pages/profile/Profile";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/profile" element={<Profile />} />
//     </Routes>
//   );
// }

// export default App;

import AppRoutes from "./routes/AppRoutes";

function App() {
  return <AppRoutes />;
}

export default App;
