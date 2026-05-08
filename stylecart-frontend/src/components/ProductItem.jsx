import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/products/${id}`} className="text-gray-700 cursor-pointer">
      
      <div className="overflow-hidden">
        {image ? (
          <img
            src={Array.isArray(image) ? image[0] : image}
            className="hover:scale-110 transition ease-in-out"
            alt={name}
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
            No Image
          </div>
        )}
      </div>

      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}{price}
      </p>

    </Link>
  );
};

export default ProductItem;