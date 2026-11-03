import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can integrate backend API or email services (e.g. EmailJS / Formspree) here
    console.log('Form Submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] bg-slate-50 px-6 py-5">
      {/* Brand Header */}
      <h1 className="text-4xl font-bold text-[#92c6f9]">
        <span className="text-[#2f0bef]">&lt;</span>
        <span>Lock</span>
        <span className="text-[#2f0bef]">s</span>
        <span className="text-[#7e05ec]">y</span>
        <span className="text-[#2f0bef]">/</span>
        <span className="text-[#2f0bef]">&gt;</span>
      </h1>
      <p className="text-gray-600 mt-2 text-lg">Get in Touch with Support</p>

      {/* Main Container */}
      <div className="mt-8 max-w-2xl w-full bg-white shadow-xl rounded-3xl p-8 border border-gray-100">
        {submitted ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-[#7e05ec] mb-2">Message Sent! 🎉</h2>
            <p className="text-gray-600 mb-6">Thanks for reaching out. We will get back to you as soon as possible.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-[#7e05ec] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#6104ba] transition-all"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border-2 border-[#6193c5] p-3 rounded-2xl focus:outline-none focus:border-[#7e05ec]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Your Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border-2 border-[#6193c5] p-3 rounded-2xl focus:outline-none focus:border-[#7e05ec]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="w-full border-2 border-[#6193c5] p-3 rounded-2xl focus:outline-none focus:border-[#7e05ec] resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#7e05ec] text-white font-semibold py-3 rounded-2xl hover:bg-[#6104ba] active:scale-98 transition-all mt-2 shadow-md"
            >
              Send Message
            </button>
          </form>
        )}

        {/* Contact Info Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-2">
          <span>📧 support@locksy.com</span>
          <span>⚡ Fast Response Time</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
