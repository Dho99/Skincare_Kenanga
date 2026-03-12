"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Package, LogOut, Sparkles } from "lucide-react";

export default function AdminSidebar({ activePage = "dashboard" }) {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
    };

    return (
        <aside className="w-64 min-h-screen bg-white border-r border-pink-100 flex flex-col shadow-sm">
            {/* Logo */}
            <div className="px-6 py-6 border-b border-pink-100">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="font-bold text-gray-800 text-sm leading-none">KennyLabs</p>
                        <p className="text-[10px] text-pink-400 font-medium tracking-wide">Admin Panel</p>
                    </div>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-6 space-y-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-3">
                    Management
                </p>

                <Link
                    href="/admin/dashboard"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activePage === "dashboard"
                            ? "bg-pink-50 text-pink-600 shadow-sm"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        }`}
                >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                </Link>

                <Link
                    href="/admin/dashboard"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activePage === "products"
                            ? "bg-pink-50 text-pink-600 shadow-sm"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        }`}
                >
                    <Package className="w-4 h-4" />
                    Products
                </Link>
            </nav>

            {/* Footer - Logout */}
            <div className="px-4 py-5 border-t border-pink-100">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-50 hover:text-red-500 transition-all"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
