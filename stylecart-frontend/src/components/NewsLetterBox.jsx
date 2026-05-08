import React from "react";

const NewsLetterBox = () => {

const onSubmitHandler = (e) => {
e.preventDefault();
}

  return (
    <div className="text-center my-10">
      <p className="text-2xl font-medium text-gray-700">
        Subscribe now for more exciting offers
      </p>
      <p className="text-gray-400 mt-3">Stay updated with our latest deals and news.</p>

      <form
        onSubmit={onSubmitHandler} // prevents page reload
        className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-6"
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="border border-gray-300 rounded-md px-4 py-3 w-full sm:w-80 outline-none focus:ring-2 focus:ring-gray-500"
        />
        <button
          type="submit"
          className="bg-black text-white text-sm px-8 py-3 rounded-md hover:bg-gray-800 transition-all"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;