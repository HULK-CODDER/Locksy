import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-50 px-6 py-5">
      {/* Header / Brand Logo */}
      <h1 className="text-5xl font-bold text-[#92c6f9]">
        <span className="text-[#2f0bef]">&lt;</span>
        <span>Lock</span>
        <span className="text-[#2f0bef]">s</span>
        <span className="text-[#7e05ec]">y</span>
        <span className="text-[#2f0bef]">/</span>
        <span className="text-[#2f0bef]">&gt;</span>
      </h1>
      <p className="text-gray-600 mt-2 text-lg">Your Personal Vault, Built for Privacy</p>

      {/* Main Card Container */}
      <div className="mt-8 max-w-3xl w-full bg-white shadow-xl rounded-3xl p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-[#7e05ec] mb-4">About Locksy</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Locksy was built with a simple goal in mind: to give you full ownership over your password security. 
          Managing online credentials shouldn't mean trusting corporate giants with your sensitive data. 
          Locksy allows you to quickly store, edit, and organize all your account credentials in one centralized, 
          accessible dashboard.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="p-5 rounded-2xl bg-[#cac5ef]/30 border border-[#cac5ef]">
            <h3 className="font-bold text-[#7e05ec] mb-1">⚡ Fast & Simple</h3>
            <p className="text-sm text-gray-600">Quickly save, copy, and organize credentials with one-click clipboard tools.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#cac5ef]/30 border border-[#cac5ef]">
            <h3 className="font-bold text-[#7e05ec] mb-1">🔐 Full Control</h3>
            <p className="text-sm text-gray-600">Easily update, delete, or reveal passwords only when you need them.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#cac5ef]/30 border border-[#cac5ef]">
            <h3 className="font-bold text-[#7e05ec] mb-1">🌐 Cloud Synced</h3>
            <p className="text-sm text-gray-600">Seamlessly connected to a lightweight API backend to access your vault anywhere.</p>
          </div>
        </div>

        {/* Security Note */}
        <div className="p-4 rounded-xl bg-purple-50 border-l-4 border-[#7e05ec] text-sm text-gray-700">
          <strong>Tip:</strong> Always ensure you use strong, unique passwords for every site you add to Locksy!
        </div>
      </div>
    </div>
  );
};

export default About;
