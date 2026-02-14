import { BrowserRouter as Router, Routes, Route } from "express";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path="/about" element={<Home/>}></Route>
{/*       <Route path="/faq" element={<Home/>}></Route>
          <Route path="/profile" element={<Home/>}></Route>
          <Route path="/login" element={<Home/>}></Route>
          <Route path="/signup" element={<Home/>}></Route>
          <Route path="/upload" element={<Home/>}></Route>
          <Route path="/search" element={<Home/>}></Route> */}



        </Routes>
      </Router>
    </>
  );
};

export default App;
