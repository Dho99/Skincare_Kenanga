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
        <aside className="w-64 min-h-screen bg-white border-r border-fabish-green/10 flex flex-col shadow-sm">
            {/* Logo */}
            <div className="px-6 py-6 border-b border-fabish-green/10">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-fabish-green to-fabish-text flex items-center justify-center shadow group-hover:shadow-md transition-shadow">
                        <Sparkles className="w-5 h-5 text-fabish-cream" />
                    </div>
                    <div>
                        <p className="font-bold font-serif text-fabish-text text-lg leading-none">KennyLabs</p>
                        <p className="text-[10px] text-fabish-green/70 font-medium tracking-wide">Admin Panel</p>
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
                        ? "bg-fabish-cream text-fabish-green shadow-sm"
                        : "text-gray-500 hover:bg-gray-50 hover:text-fabish-text"
                        }`}
                >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                </Link>

                <Link
                    href="/admin/dashboard"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activePage === "products"
                        ? "bg-fabish-cream text-fabish-green shadow-sm"
                        : "text-gray-500 hover:bg-gray-50 hover:text-fabish-text"
                        }`}
                >
                    <Package className="w-4 h-4" />
                    Products
                </Link>
            </nav>

            {/* Footer - Logout */}
            <div className="px-4 py-5 border-t border-fabish-green/10">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-700 transition-all"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
