"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, RefreshCw, Package, Star, TrendingUp, Search } from "lucide-react";
import { toast } from "sonner";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ProductTable from "@/components/admin/ProductTable";
import ProductFormModal from "@/components/admin/ProductFormModal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import { adminApi } from "@/lib/adminApi";

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // Modals
    const [formOpen, setFormOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const res = await adminApi.getProducts();
            const data = await res.json();
            setProducts(data);
            setFilteredProducts(data);
        } catch {
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Search filter
    useEffect(() => {
        if (!search.trim()) {
            setFilteredProducts(products);
        } else {
            const q = search.toLowerCase();
            setFilteredProducts(
                products.filter(
                    (p) =>
                        p.name.toLowerCase().includes(q) ||
                        p.description?.toLowerCase().includes(q) ||
                        p.category?.toLowerCase().includes(q)
                )
            );
        }
    }, [search, products]);

    // Create
    const handleCreate = () => {
        setEditProduct(null);
        setFormOpen(true);
    };

    // Edit
    const handleEdit = (product) => {
        setEditProduct(product);
        setFormOpen(true);
    };

    // Submit create or edit
    const handleFormSubmit = async (data) => {
        try {
            let res;
            if (editProduct) {
                res = await adminApi.updateProduct(editProduct.id, data);
            } else {
                res = await adminApi.createProduct(data);
            }

            if (!res.ok) {
                const err = await res.json();
                toast.error(err.error || "Operation failed");
                return;
            }

            await fetchProducts();
            setFormOpen(false);
            setEditProduct(null);
            toast.success(editProduct ? "Product updated!" : "Product created!");
        } catch {
            toast.error("Something went wrong");
        }
    };

    // Delete
    const handleDeleteOpen = (product) => {
        setDeleteProduct(product);
        setDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!deleteProduct) return;
        setDeleteLoading(true);
        try {
            const res = await adminApi.deleteProduct(deleteProduct.id);
            if (!res.ok) {
                toast.error("Failed to delete product");
                return;
            }
            await fetchProducts();
            setDeleteOpen(false);
            setDeleteProduct(null);
            toast.success("Product deleted successfully");
        } catch {
            toast.error("Something went wrong");
        } finally {
            setDeleteLoading(false);
        }
    };

    // Stats
    const stats = {
        total: products.length,
        star: products.filter((p) => p.category === "star").length,
        bestseller: products.filter((p) => p.category === "bestseller").length,
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar activePage="dashboard" />

            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="bg-white border-b border-pink-100 px-8 py-5 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Product Catalog</h1>
                        <p className="text-xs text-gray-400 mt-0.5">Manage your skincare products</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchProducts}
                            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
                            title="Refresh"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                        </button>
                        <button
                            onClick={handleCreate}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 shadow hover:shadow-md transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            Add Product
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white rounded-2xl border border-pink-100 p-5 flex items-center gap-4">
                            <div className="w-11 h-11 bg-pink-50 rounded-xl flex items-center justify-center">
                                <Package className="w-5 h-5 text-pink-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                                <p className="text-xs text-gray-400 font-medium">Total Products</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-yellow-100 p-5 flex items-center gap-4">
                            <div className="w-11 h-11 bg-yellow-50 rounded-xl flex items-center justify-center">
                                <Star className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{stats.star}</p>
                                <p className="text-xs text-gray-400 font-medium">Star Products</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-rose-100 p-5 flex items-center gap-4">
                            <div className="w-11 h-11 bg-rose-50 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-rose-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{stats.bestseller}</p>
                                <p className="text-xs text-gray-400 font-medium">Bestsellers</p>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white transition"
                        />
                    </div>

                    {/* Product Table */}
                    {loading ? (
                        <div className="bg-white rounded-2xl border border-pink-100 p-12 flex items-center justify-center">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-8 h-8 border-4 border-pink-300 border-t-pink-500 rounded-full animate-spin" />
                                <p className="text-sm text-gray-400">Loading products...</p>
                            </div>
                        </div>
                    ) : (
                        <ProductTable
                            products={filteredProducts}
                            onEdit={handleEdit}
                            onDelete={handleDeleteOpen}
                        />
                    )}
                </div>
            </main>

            {/* Modals */}
            <ProductFormModal
                isOpen={formOpen}
                product={editProduct}
                onClose={() => { setFormOpen(false); setEditProduct(null); }}
                onSubmit={handleFormSubmit}
            />
            <DeleteConfirmModal
                isOpen={deleteOpen}
                product={deleteProduct}
                onClose={() => { setDeleteOpen(false); setDeleteProduct(null); }}
                onConfirm={handleDeleteConfirm}
                loading={deleteLoading}
            />
        </div>
    );
}
