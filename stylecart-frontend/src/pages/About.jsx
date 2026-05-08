import React from "react";
import aboutImg from "../assets/aboutimg.png"; // make sure this image exists in your assets folder

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-wide text-center">
        About <span className="text-red-500">Clothica</span>
      </h1>

      {/* Content Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 max-w-6xl w-full">
        {/* Left: Text */}
        <div className="md:w-1/2 text-gray-800 leading-relaxed">
          <p className="mb-6 text-lg">
            Welcome to <span className="font-semibold text-red-500">Clothica</span> —
            your go-to destination for trendy, elegant, and affordable fashion.
            We believe every woman deserves to feel confident, stylish, and comfortable in her own skin.
          </p>

          <p className="mb-6 text-lg">
            From everyday essentials to chic statement outfits, our collections are
            crafted to highlight your unique beauty and charm. ✨
          </p>

          <p className="text-lg">
            At <span className="font-semibold text-red-500">Clothica</span>, fashion is not
            just about clothes — it’s about expressing who you are.
          </p>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={aboutImg}
            alt="About Clothica"
            className="rounded-2xl shadow-lg w-full md:w-[90%] object-cover border border-gray-200"
          />
        </div>
      </div>

      {/* Highlights Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl mt-12">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-100">
          <h2 className="text-xl font-semibold mb-2 text-red-500">Our Vision</h2>
          <p className="text-gray-700">
            To empower individuals to express themselves through fashion that inspires confidence and grace.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-100">
          <h2 className="text-xl font-semibold mb-2 text-red-500">Our Style</h2>
          <p className="text-gray-700">
            From casual chic to classy couture — we bring you collections that define your personality.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-100">
          <h2 className="text-xl font-semibold mb-2 text-red-500">Our Promise</h2>
          <p className="text-gray-700">
            Quality, comfort, and design are at the heart of everything we create — for the true Clothica in you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;