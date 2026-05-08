import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-10">
      {/* Title */}
      <h1 className="text-4xl font-bold text-black mb-2 tracking-wide">
        Contact <span className="text-red-500">Clothica</span>
      </h1>
      <p className="text-gray-700 mb-10 text-center max-w-md">
        Have a question, feedback, or collaboration idea?  
        We’d love to hear from you — Clothica is always here for you ❤️
      </p>

      {/* Contact Form */}
      <form className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col gap-4 border border-gray-300">
        <input
          type="text"
          placeholder="Your Name"
          className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-red-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-red-500"
        />
        <textarea
          placeholder="Your Message"
          rows="5"
          className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-red-500 resize-none"
        ></textarea>
        <button
          type="submit"
          className="bg-red-600 text-white py-2 rounded-md hover:bg-black transition duration-300"
        >
          Send Message
        </button>
      </form>

      {/* Contact Info */}
      <div className="mt-10 text-center text-gray-800">
        <p className="font-medium">📧 Email: support@clothica.com</p>
        <p className="font-medium">📞 Phone: +91 98765 43210</p>
        <p className="font-medium">📍 Location: Mumbai, Maharashtra, India</p>
      </div>
    </div>
  );
};

export default Contact;