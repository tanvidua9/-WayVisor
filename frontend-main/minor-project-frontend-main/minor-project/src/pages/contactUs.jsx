import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    travelInterest: '',
    message: '',
    consent: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.travelInterest) newErrors.travelInterest = 'Please select your travel interest';
    if (!formData.message) newErrors.message = 'Message is required';
    if (!formData.consent) newErrors.consent = 'You must consent to be contacted';

    if (Object.keys(newErrors).length === 0) {
      // Form submission logic would go here
      setIsSubmitted(true);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50" style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      margin: 0,
      padding: 0,
      overflow: "auto"
    }}>
      {/* Header Banner */}
      <div className="bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold">Contact Us</h2>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">Contact Our Travel Experts</h2>
          <p className="text-lg text-gray-700">We're here to help plan your dream vacation and answer any questions.</p>
        </div>


        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center shadow-md">
            <h3 className="text-2xl font-semibold text-green-700 mb-3">Message Sent!</h3>
            <p className="text-green-600">Thanks for reaching out. Our travel experts will be in touch soon to help plan your adventure.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 mb-10">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Query</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </div>


              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
              >
                <span>Send Message</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </form>
          </div>
        )}


      </div>
    </div>
  );
};

export default ContactUs;
