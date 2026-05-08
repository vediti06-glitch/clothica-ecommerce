import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useAdmin } from '../context/AdminContext';
import axios from "axios";
import './AddItem.css';

const CATEGORIES = ['Men', 'Women', 'Kids'];
const SUB_CATEGORIES = ['Topwear', 'Bottomwear', 'Winterwear'];
const ALL_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const AddItem = () => {
    const { setProducts } = useAdmin();
    const fileInputRefs = [useRef(), useRef(), useRef(), useRef()];

    const [form, setForm] = useState({
        name: '',
        description: '',
        category: 'Men',
        subCategory: 'Topwear',
        price: '',
        sizes: [],
        bestseller: false,
    });
    const [images, setImages] = useState([null, null, null, null]);
    const [previews, setPreviews] = useState([null, null, null, null]);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (index, e) => {
        const file = e.target.files[0];
        if (!file) return;
        const newImages = [...images];
        const newPreviews = [...previews];
        newImages[index] = file;
        newPreviews[index] = URL.createObjectURL(file);
        setImages(newImages);
        setPreviews(newPreviews);
    };
    

    const removeImage = (index) => {
        const newImages = [...images];
        const newPreviews = [...previews];
        newImages[index] = null;
        newPreviews[index] = null;
        setImages(newImages);
        setPreviews(newPreviews);
        if (fileInputRefs[index].current) fileInputRefs[index].current.value = '';
    };

    const toggleSize = (size) => {
        setForm(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size) ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size],
        }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

   const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name.trim()) {
    toast.error("Product name is required");
    return;
  }

  if (!form.price || Number(form.price) <= 0) {
    toast.error("Valid price is required");
    return;
  }

  if (form.sizes.length === 0) {
    toast.error("Select at least one size");
    return;
  }

  if (!images.some(Boolean)) {
    toast.error("Upload at least one product image");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("subCategory", form.subCategory);
    formData.append("price", form.price);
    formData.append("sizes", JSON.stringify(form.sizes));
    formData.append("bestseller", form.bestseller);

    images.forEach((img) => {
      if (img) formData.append("images", img);
    });

    const res = await axios.post(
      "http://localhost:5000/api/products/add",
      formData
    );

    toast.success("Product added successfully!");

  } catch (error) {
    console.error(error);
    toast.error("Failed to add product");
  }

  setLoading(false);
};

    return (
        <div className="additem-page">
            <div className="page-header">
                <h1>Add New Product</h1>
                <p>Fill in the details below to add a new product to the catalogue</p>
            </div>

            <form className="additem-form card" onSubmit={handleSubmit}>

                {/* Image Upload */}
                <div className="additem-section">
                    <h3 className="section-title">Product Images</h3>
                    <p className="section-subtitle">Upload up to 4 images. First image will be the main thumbnail.</p>
                    <div className="image-upload-grid">
                        {[0, 1, 2, 3].map(i => (
                            <div key={i} className={`image-slot ${previews[i] ? 'has-image' : ''}`}>
                                {previews[i] ? (
                                    <>
                                        <img src={previews[i]} alt={`Product ${i + 1}`} className="image-preview" />
                                        <button type="button" className="image-remove" onClick={() => removeImage(i)}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                        </button>
                                        {i === 0 && <span className="image-main-badge">Main</span>}
                                    </>
                                ) : (
                                    <label className="image-upload-label" htmlFor={`img-${i}`}>
                                        <div className="upload-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
                                                <polyline points="21 15 16 10 5 21" />
                                            </svg>
                                        </div>
                                        <span className="upload-text">{i === 0 ? 'Main Image' : `Image ${i + 1}`}</span>
                                        <input
                                            id={`img-${i}`}
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            ref={fileInputRefs[i]}
                                            onChange={(e) => handleImageChange(i, e)}
                                        />
                                    </label>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="additem-divider" />

                {/* Product Details */}
                <div className="additem-section">
                    <h3 className="section-title">Product Details</h3>
                    <div className="form-grid-2">
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Product Name *</label>
                            <input name="name" className="form-input" placeholder="e.g. Classic Oxford Shirt" value={form.name} onChange={handleChange} />
                        </div>
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Description</label>
                            <textarea name="description" className="form-input" placeholder="Describe your product..." rows={4} value={form.description} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Category *</label>
                            <select name="category" className="form-input" value={form.category} onChange={handleChange}>
                                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Sub-Category *</label>
                            <select name="subCategory" className="form-input" value={form.subCategory} onChange={handleChange}>
                                {SUB_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Price (₹) *</label>
                            <input name="price" type="number" min="0" className="form-input" placeholder="0.00" value={form.price} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="additem-divider" />

                {/* Sizes */}
                <div className="additem-section">
                    <h3 className="section-title">Available Sizes *</h3>
                    <div className="size-grid">
                        {ALL_SIZES.map(size => (
                            <button
                                key={size}
                                type="button"
                                className={`size-btn ${form.sizes.includes(size) ? 'selected' : ''}`}
                                onClick={() => toggleSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="additem-divider" />

                {/* Bestseller + Submit */}
                <div className="additem-section additem-bottom">
                    <label className="bestseller-checkbox">
                        <input
                            type="checkbox"
                            name="bestseller"
                            checked={form.bestseller}
                            onChange={handleChange}
                        />
                        <div className="checkbox-custom">
                            {form.bestseller && (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                        </div>
                        <div className="bestseller-info">
                            <span className="bestseller-label">Mark as Bestseller</span>
                            <span className="bestseller-desc">This product will appear in the bestseller section on the storefront</span>
                        </div>
                        {form.bestseller && <span className="bestseller-badge">⭐ Bestseller</span>}
                    </label>

                    <button type="submit" className="btn btn-primary add-btn" disabled={loading}>
                        {loading ? <span className="login-spinner" /> : (
                            <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                Add Product
                            </>
                        )}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddItem;
