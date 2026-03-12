"use client";

import Image from "next/image";
import { Pencil, Trash2, Star } from "lucide-react";

export default function ProductTable({ products, onEdit, onDelete }) {
    if (!products || products.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-pink-100 p-12 text-center">
                <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📦</span>
                </div>
                <p className="text-gray-400 font-medium mb-1">No products yet</p>
                <p className="text-sm text-gray-300">Add your first product using the button above.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-pink-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-pink-50 border-b border-pink-100">
                            <th className="text-left px-5 py-3.5 text-xs font-semibold text-pink-500 uppercase tracking-wider">Product</th>
                            <th className="text-left px-5 py-3.5 text-xs font-semibold text-pink-500 uppercase tracking-wider">Category</th>
                            <th className="text-left px-5 py-3.5 text-xs font-semibold text-pink-500 uppercase tracking-wider">Price</th>
                            <th className="text-left px-5 py-3.5 text-xs font-semibold text-pink-500 uppercase tracking-wider">Rating</th>
                            <th className="text-left px-5 py-3.5 text-xs font-semibold text-pink-500 uppercase tracking-wider">Reviews</th>
                            <th className="text-right px-5 py-3.5 text-xs font-semibold text-pink-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-pink-50/30 transition-colors">
                                {/* Product Info */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 rounded-xl overflow-hidden bg-pink-50 border border-pink-100 flex-shrink-0 relative">
                                            <Image
                                                src={product.image || "/produk.jpg"}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                                onError={() => { }}
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800 leading-tight">{product.name}</p>
                                            <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[180px]">{product.description}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Category */}
                                <td className="px-5 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.category === 'star'
                                            ? 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                                            : 'bg-pink-50 text-pink-600 border border-pink-200'
                                        }`}>
                                        {product.category === 'star' ? '⭐ Star' : '🔥 Bestseller'}
                                    </span>
                                </td>

                                {/* Price */}
                                <td className="px-5 py-4">
                                    <span className="font-semibold text-gray-800">${product.price}</span>
                                </td>

                                {/* Rating */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                        <span className="font-medium text-gray-700">{product.rating}</span>
                                    </div>
                                </td>

                                {/* Reviews */}
                                <td className="px-5 py-4 text-gray-500">{product.reviews}</td>

                                {/* Actions */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(product)}
                                            className="p-2 rounded-lg text-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
                                            title="Edit product"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(product)}
                                            className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
                                            title="Delete product"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
