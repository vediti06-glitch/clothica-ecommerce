import React from 'react';
import { toast } from 'react-toastify';
import { useAdmin } from '../context/AdminContext';
import './ListItems.css';

const categoryColor = {
    'Men': 'badge-info',
    'Women': 'badge-pink',
    'Kids': 'badge-purple',
};

const ListItems = () => {
    const { products, setProducts } = useAdmin();

    const handleDelete = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
        toast.success('Product removed successfully');
    };

    return (
        <div className="listpage">
            <div className="page-header">
                <h1>Product Catalogue</h1>
                <p>{products.length} product{products.length !== 1 ? 's' : ''} in catalogue</p>
            </div>

            {products.length === 0 ? (
                <div className="empty-state card">
                    <div className="empty-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        </svg>
                    </div>
                    <h3>No Products Yet</h3>
                    <p>Add your first product using the "Add Items" section</p>
                </div>
            ) : (
                <div className="card list-card">
                    {/* Table Header */}
                    <div className="list-table-header">
                        <span className="col-img">Image</span>
                        <span className="col-name">Product Name</span>
                        <span className="col-cat">Category</span>
                        <span className="col-subcat">Sub-Category</span>
                        <span className="col-price">Price</span>
                        <span className="col-sizes">Sizes</span>
                        <span className="col-badge">Tag</span>
                        <span className="col-action">Action</span>
                    </div>

                    <div className="list-table-body">
                        {products.map((product, index) => (
                            <div key={product.id} className="list-row" style={{ animationDelay: `${index * 0.04}s` }}>
                                {/* Image */}
                                <div className="col-img">
                                    {product.images && product.images[0] ? (
                                        <img src={product.images[0]} alt={product.name} className="product-thumb" />
                                    ) : (
                                        <div className="product-thumb-placeholder">
                                            {product.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                {/* Name */}
                                <div className="col-name">
                                    <div className="product-name">{product.name}</div>
                                    {product.description && (
                                        <div className="product-desc">{product.description.substring(0, 50)}{product.description.length > 50 ? '...' : ''}</div>
                                    )}
                                </div>

                                {/* Category */}
                                <div className="col-cat">
                                    <span className={`badge ${categoryColor[product.category] || 'badge-info'}`}>
                                        {product.category}
                                    </span>
                                </div>

                                {/* Sub Category */}
                                <div className="col-subcat">
                                    <span className="subcat-text">{product.subCategory}</span>
                                </div>

                                {/* Price */}
                                <div className="col-price">
                                    <span className="price-text">₹{product.price.toLocaleString('en-IN')}</span>
                                </div>

                                {/* Sizes */}
                                <div className="col-sizes">
                                    <div className="sizes-list">
                                        {product.sizes.map(s => (
                                            <span key={s} className="size-chip">{s}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Bestseller */}
                                <div className="col-badge">
                                    {product.bestseller ? (
                                        <span className="badge badge-warning">⭐ Best</span>
                                    ) : (
                                        <span className="badge" style={{ background: '#f3f4f6', color: '#9ca3af' }}>—</span>
                                    )}
                                </div>

                                {/* Action */}
                                <div className="col-action">
                                    <button
                                        className="btn btn-danger delete-btn"
                                        onClick={() => handleDelete(product.id)}
                                        title="Remove product"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                            <path d="M10 11v6" /><path d="M14 11v6" />
                                            <path d="M9 6V4h6v2" />
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListItems;
