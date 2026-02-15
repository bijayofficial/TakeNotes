import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.jpg";

const Hero = () => {
  return (
    <section className="relative h-[700px] w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-7xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Organize Your Notes
            <span className="block bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Smarter & Faster
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl">
            TakeNotes helps you capture ideas, manage tasks, and stay productive
            with a clean and powerful interface.
          </p>

         <div className="flex gap-10 align-center">
           <Link
            to="/register"
            className="inline-block mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg"
          >
            SignUp
          </Link>
          <Link
            to="/login"
            className="inline-block mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg"
          >
            Login
          </Link>
         </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
