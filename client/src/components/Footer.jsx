import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-8 md:px-16 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            YourCompany
          </h2>
          <p className="text-sm leading-6">
            We build scalable web applications and modern digital solutions 
            that help businesses grow in the AI-driven era.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@yourcompany.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: Kolkata, India</li>
          </ul>
        </div>

        {/* Career Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Careers
          </h3>
          <p className="text-sm mb-4">
            Interested in working with us? Join our team of passionate 
            developers and innovators.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
            View Open Positions
          </button>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        © {new Date().getFullYear()} The DevCompany. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
