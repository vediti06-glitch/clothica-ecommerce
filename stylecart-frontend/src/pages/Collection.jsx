import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import { assets } from '../assets/assets';
import Title from '../components/Title';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
const [filteredProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // Toggle category selection
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Toggle subcategory selection
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Apply filtering
  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  // Sort products
  const sortProduct = () => {
    let fpCopy = filteredProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  // Re-apply filters when category/subCategory/search changes
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, products, search, showSearch]);

  // Sort when sort type changes
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 bg-gray-50 min-h-screen text-gray-900">
      {/* Sidebar Filters */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 text-red-600 font-semibold"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="toggle"
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 rounded-md py-3 mt-6 bg-white ${
            showFilter ? 'block' : 'hidden'
          } sm:block`}
        >
          <p className="font-medium mb-3 text-black">Category</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input
                className="w-3 accent-red-600"
                type="checkbox"
                value="men"
                onChange={toggleCategory}
              />
              Men
            </label>
            <label className="flex gap-2">
              <input
                className="w-3 accent-red-600"
                type="checkbox"
                value="women"
                onChange={toggleCategory}
              />
              Women
            </label>
            <label className="flex gap-2">
              <input
                className="w-3 accent-red-600"
                type="checkbox"
                value="kids"
                onChange={toggleCategory}
              />
              Kids
            </label>
          </div>
        </div>

        {/* Subcategory Filter */}
        <div
          className={`border border-gray-300 rounded-md py-3 my-5 bg-white ${
            showFilter ? 'block' : 'hidden'
          } sm:block`}
        >
          <p className="font-medium mb-3 text-black">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input
                className="w-3 accent-red-600"
                type="checkbox"
                value="topwear"
                onChange={toggleSubCategory}
              />
              Top Wear
            </label>
            <label className="flex gap-2">
              <input
                className="w-3 accent-red-600"
                type="checkbox"
                value="bottomwear"
                onChange={toggleSubCategory}
              />
              Bottom Wear
            </label>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="pt-10 border-t flex-1">
        {/* Title */}
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
        </div>

        {/* Sort dropdown */}
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="border-2 border-gray-300 text-sm px-2 mb-6 bg-white text-gray-800 rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-500"
        >
          <option value="relevant">Sort By Relevant</option>
          <option value="low-high">Sort By Low-High</option>
          <option value="high-low">Sort By High-Low</option>
        </select>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((item) => (
      <ProductItem
        key={item._id}
        id={item._id}
        image={item.image}
        category={item.category}
        subCategory={item.subCategory}
        name={item.name}
        price={item.price}
      />
    ))
  ) : (
    <p className="col-span-full text-center text-gray-500">
      No products found
    </p>
  )}
</div>
      </div>
    </div>
  );
};

export default Collection;