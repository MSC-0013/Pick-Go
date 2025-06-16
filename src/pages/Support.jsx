import React from "react";
import Navigation from "@/components/Navigation";

const Support = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <Navigation />

      {/* Main Container */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Card */}
        <div className="bg-white shadow-2xl rounded-3xl p-10 sm:p-14 border border-blue-100 transition-all duration-300">
          
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-blue-700 mb-3">
              🛠️ Pick&GO Support
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Get in touch for help with bookings, payments, or anything else — we’re available 24/7.
            </p>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-50 p-6 rounded-2xl mb-10 space-y-4 text-gray-700 shadow-md">
            <h2 className="text-2xl font-bold text-blue-700">📞 Contact Us</h2>
            <p>
              📧 <strong>Email:</strong>{" "}
              <a
                href="mailto:support@pickgo.com"
                className="text-blue-600 underline hover:text-blue-800 transition"
              >
                support@pickgo.com
              </a>
            </p>
            <p>☎️ <strong>Phone:</strong> +91 93480 xxxxx</p>
            <p>🕐 <strong>Hours:</strong> 24/7 Available</p>
            <p className="text-sm text-gray-500">
              Response Time: <span className="font-semibold">Under 1 hour</span>
            </p>
          </div>

          {/* Support Form */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              📝 Submit a Support Request
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us what's wrong or what you need help with..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
