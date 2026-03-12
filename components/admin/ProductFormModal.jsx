"use client";

import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";

const emptyForm = {
    name: "",
    price: "",
    description: "",
    image: "",
    category: "star",
    rating: "4.5",
    reviews: "0",
};

export default function ProductFormModal({ isOpen, product, onClose, onSubmit }) {
    const [form, setForm] = useState(emptyForm);
    const [loading, setLoading] = useState(false);

    const isEdit = !!product;

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name || "",
                price: String(product.price || ""),
                description: product.description || "",
                image: product.image || "",
                category: product.category || "star",
                rating: String(product.rating || "4.5"),
                reviews: String(product.reviews || "0"),
            });
        } else {
            setForm(emptyForm);
        }
    }, [product, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({
                name: form.name,
                price: parseFloat(form.price),
                description: form.description,
                image: form.image,
                category: form.category,
                rating: parseFloat(form.rating),
                reviews: parseInt(form.reviews),
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Slide-in Panel */}
            <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-pink-100 bg-gradient-to-r from-pink-50 to-rose-50">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">
                            {isEdit ? "Edit Product" : "Add New Product"}
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {isEdit ? "Update the product details" : "Fill in the product information"}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white border border-pink-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:shadow-sm transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                            Product Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Pure Glow Serum"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition"
                        />
                    </div>

                    {/* Price + Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                Price (USD) <span className="text-red-400">*</span>
                            </label>
                            <input
                                name="price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.price}
                                onChange={handleChange}
                                required
                                placeholder="0.00"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                Category
                            </label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition bg-white"
                            >
                                <option value="star">⭐ Star</option>
                                <option value="bestseller">🔥 Bestseller</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Short product description..."
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition resize-none"
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                            Image Path / URL
                        </label>
                        <div className="relative">
                            <Upload className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                            <input
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                placeholder="/produk.jpg"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition"
                            />
                        </div>
                        {form.image && (
                            <div className="mt-2 w-16 h-16 rounded-lg overflow-hidden border border-pink-100 bg-pink-50">
                                <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                            </div>
                        )}
                    </div>

                    {/* Rating + Reviews */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                Rating (0–5)
                            </label>
                            <input
                                name="rating"
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                value={form.rating}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                # Reviews
                            </label>
                            <input
                                name="reviews"
                                type="number"
                                min="0"
                                value={form.reviews}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition"
                            />
                        </div>
                    </div>
                </form>

                {/* Footer - CTA */}
                <div className="px-6 py-4 border-t border-pink-100 flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 shadow hover:shadow-md transition-all disabled:opacity-50"
                    >
                        {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Product"}
                    </button>
                </div>
            </div>
        </div>
    );
}
