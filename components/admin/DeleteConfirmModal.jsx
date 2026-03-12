"use client";

import { AlertTriangle, X } from "lucide-react";

export default function DeleteConfirmModal({ isOpen, product, onClose, onConfirm, loading }) {
    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            {/* Modal Card */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
                {/* Header stripe */}
                <div className="h-1 bg-gradient-to-r from-red-400 to-rose-500" />

                <div className="p-6">
                    {/* Icon */}
                    <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-7 h-7 text-red-400" />
                    </div>

                    <h3 className="text-center text-lg font-bold text-gray-800 mb-1">Delete Product</h3>
                    <p className="text-center text-sm text-gray-500 mb-1">
                        Are you sure you want to delete
                    </p>
                    <p className="text-center text-sm font-semibold text-gray-800 mb-5">
                        &ldquo;{product.name}&rdquo;?
                    </p>
                    <p className="text-center text-xs text-gray-400 mb-6">
                        This action cannot be undone.
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-red-400 to-rose-500 hover:from-red-500 hover:to-rose-600 shadow transition-all disabled:opacity-50"
                        >
                            {loading ? "Deleting..." : "Yes, Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
