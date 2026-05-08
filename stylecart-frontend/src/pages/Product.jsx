import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
  const item = products.find((item) => item._id === productId);

  if (item) {
    setProductData(item);
    setImage(item.image && item.image[0] ? item.image[0] : "");
  }
};

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!size) {
      alert("Please select a size before adding to cart!");
      return;
    }
    addToCart(productData._id, size); // ✅ fixed (_id → id)
  };

  return productData ? (
    <div className="border-t-2 pt-10">

      <div className="flex gap-12 flex-col sm:flex-row">

        {/* LEFT SIDE IMAGE */}
        <div className="flex-1">
          {image ? (
            <img className="w-full h-auto" src={image} alt={productData.name} />
          ) : (
            <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
              No Image
            </div>
          )}
        </div>

        {/* RIGHT SIDE DETAILS */}
        <div className="flex-1">

          <h1 className="text-2xl">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_dull} className="w-3.5" alt="" />
            <p className="pl-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl">
            {currency}{productData.price}
          </p>

          <p className="mt-5 text-gray-500">
            {productData.description || "No description"}
          </p>

          {/* SIZE */}
          <div className="mt-6">
            <p>Select Size</p>

            <div className="flex gap-2 mt-2">
              {productData.size?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border px-4 py-2 ${
                    size === item ? "border-orange-500" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 mt-6"
          >
            ADD TO CART
          </button>

        </div>
      </div>

    </div>
  ) : null;
};

export default Product;