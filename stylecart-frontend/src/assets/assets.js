// ---------- ICONS & COMMON ASSETS ----------
import bin from './bin.png'
import account from './account.png'
import cart from './cart.png'
import contact from './contact.png'
import cover from './cover.png'


import exchange_icon from './exchange_icon.png'
import logo from './logo.png'

import returnpolicy from './returnpolicy.png'
import search from './search.png'
import cross_icon from './cross_icon.png'
import support from './support.png'
import star_icon from './star_icon.png'
import star_dull from './star_dull.png'
import razorpay from './razorpay.png'
import stripe from './stripe.png'
import aboutimg from './aboutimg.png'

// ---------- PRODUCT IMAGES ----------
import p_img1 from './p_img1.png'
import p_img3 from './p_img3.png'
import p_img4 from './p_img4.png'

import p_img6 from './p_img6.png'
import p_img8 from './p_img8.png'
import p_img10 from './p_img10.png'
import p_img12 from './p_img12.png'
import p_img13 from './p_img13.png'
import p_img14 from './p_img14.png'
import p_img55 from './p_img55.png'
import p_img28 from './p_img28.png'
import p_img18 from './p_img18.png'
import p_img43 from './p_img43.png'
import p_img24 from './p_img24.png'
import p_img9 from './p_img9.png'

// ---------- ASSETS EXPORT ----------
export const assets = {
  bin,
  account,
  cart,
  contact,
 cover,
  
  exchange_icon,
  logo,
  
  returnpolicy,
  search,
   cross_icon,
  support,
  star_icon,
  star_dull,
  razorpay,
  aboutimg,
  stripe,
  p_img1,
  p_img3,
  p_img4,
  p_img6,
  p_img8,
  p_img10,
  
  p_img12,
  p_img13,
  p_img14,
  p_img55,
  
  p_img28,
  p_img18,
 
  p_img43,
  

  p_img24,
  p_img9,
}

// ---------- PRODUCTS DATA ----------
export const products = [
  {
    _id: "aaaa",
    name: "Women's Top",
    description: "Women's Floral Print Relaxed Fit Off-Shoulder Top",
    price: 200,
    image: [p_img1],
    category: "women",
    subCategory: "topwear",
    size: ["S", "M", "L"],
    bestseller: false,
  },
  
  {
    _id: "aaac",
    name: "Women's Solid Top",
    description: "Women's Solid Round Neck Off-Shoulder T-Shirt",
    price: 120,
    image: [p_img3],
    category: "women",
    subCategory: "topwear",
    size: ["S", "M", "L"],
    bestseller: true,
  },
  {
    _id: "aaad",
    name: "MenT-Shirt",
    description: " Solid Round Neck Cotton T-Shirt",
    price: 120,
    image: [p_img4],
    category: "men",
    subCategory: "topwear",
    size: ["S", "M", "L"],
    bestseller: false,
  },
  
  {
    _id: "aaaf",
    name: "Men's Gray Pant",
    description: "Comfortable gray pant for men",
    price: 350,
    image: [p_img6],
    category: "men",
    subCategory: "bottomwear",
    size: ["M", "L", "XL"],
    bestseller: true,
  },
  
  {
    _id: "aaah",
    name: "Women's Sky Blue Shirt",
    description: "Cotton sky-blue buttoned shirt for women",
    price: 400,
    image: [p_img8],
    category: "women",
    subCategory: "topwear",
    size: ["S", "M", "L"],
    bestseller: true,
  },
  
  {
    _id: "aaaj",
    name: "Men's Casual Pant (Blue)",
    description: "Blue casual pant for men",
    price: 350,
    image: [p_img10],
    category: "men",
    subCategory: "bottomwear",
    size: ["M", "L", "XL"],
    bestseller: true,
  },

  {
    _id: "aaal",
    name: "Women's Plazo (White with Black Dots)",
    description: "White plazo with black dots for women",
    price: 350,
    image: [p_img12],
    category: "women",
    subCategory: "bottomwear",
    size: ["S", "M", "L"],
    bestseller: true,
  },
  {
    _id: "aaam",
    name: "Brick Red Tracksuit Jacket",
    description: "Brick red tracksuit jacket for women",
    price: 450,
    image: [p_img13],
    category: "women",
    subCategory: "topwear",
    size: ["S", "M", "L"],
    bestseller: true,
  },
  {
    _id: "aaan",
    name: "Blue Plazo Pants",
    description: "Comfortable blue plazo pants for women",
    price: 400,
    image: [p_img14],
    category: "women",
    subCategory: "bottomwear",
    size: ["S", "M", "L"],
    bestseller: false,
  },
  {
    _id: "aaao",
    name: "Kids White-Black Stripe Shirt",
    description: "White shirt with black stripes for kids",
    price: 180,
    image: [p_img55],
    category: "kids",
    subCategory: "topwear",
    size: ["S", "M", "L"],
    bestseller: true,
  },
  
  {
    _id: "aaaq",
    name: "Men's Orange Leather Jacket",
    description: "Trendy orange leather jacket for men",
    price: 1200,
    image: [p_img28],
    category: "men",
    subCategory: "topwear",
    size: ["M", "L", "XL"],
    bestseller: true,
  },
  {
    _id: "aaar",
    name: "Women's Gray V-Neck T-Shirt",
    description: "Soft gray V-neck t-shirt for women",
    price: 250,
    image: [p_img18],
    category: "women",
    subCategory: "topwear",
    size: ["S", "M", "L"],
    bestseller: false,
  },
  
  {
    _id: "aaau",
    name: "Kids Blue Jeans",
    description: "Classic blue jeans for kids",
    price: 200,
    image: [p_img43],
    category: "kids",
    subCategory: "bottomwear",
    size: ["S", "M", "L"],
    bestseller: false,
  },
  
 
  {
    _id: "aaax",
    name: "Women's Baby Pink Jacket",
    description: "Baby pink zip-up jacket for women",
    price: 400,
    image: [p_img24],
    category: "women",
    subCategory: "topwear",
    size: ["S", "M", "L"],
    bestseller: true,
  },

  {
    _id: "aaay",
    name: "Kids Girl Blue top",
    description: "Classic blue top for kids",
    price: 200,
    image: [p_img9],
    category: "kids",
    subCategory: "topwear",
    size: ["S", "M", "L"],
    bestseller: false,
  },
];