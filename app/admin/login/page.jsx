"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Sparkles, Lock, User } from "lucide-react";
import { adminApi } from "@/lib/adminApi";

export default function AdminLoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await adminApi.login(form);
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Login failed. Please check your credentials.");
                return;
            }

            localStorage.setItem("admin_token", data.token);
            router.push("/admin/dashboard");
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-fabish-cream flex items-center justify-center px-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-fabish-green/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-fabish-lime/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-sm">
                {/* Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-fabish-green/10 overflow-hidden">
                    {/* Header gradient bar */}
                    <div className="h-1.5 bg-gradient-to-r from-fabish-lime via-fabish-green to-fabish-lime" />

                    <div className="px-8 py-8">
                        {/* Logo */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fabish-green to-fabish-text flex items-center justify-center shadow-lg mb-4">
                                <Sparkles className="w-8 h-8 text-fabish-cream" />
                            </div>
                            <h1 className="text-2xl font-bold font-serif text-fabish-text">KennyLabs</h1>
                            <p className="text-sm text-fabish-green/60 mt-1 font-medium">Admin Dashboard</p>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5 flex items-start gap-2">
                                <span className="mt-0.5">⚠️</span>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Username */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                    Username
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input
                                        type="text"
                                        value={form.username}
                                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                                        required
                                        placeholder="admin"
                                        autoComplete="username"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-fabish-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fabish-lime focus:border-transparent transition bg-gray-50/50"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        required
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 text-sm text-fabish-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fabish-lime focus:border-transparent transition bg-gray-50/50"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-2 py-3 rounded-xl text-sm font-bold text-fabish-cream bg-gradient-to-r from-fabish-green to-fabish-text hover:from-fabish-lime hover:to-fabish-green shadow-lg hover:shadow-fabish-green/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : "Sign In to Admin"}
                            </button>
                        </form>

                        <p className="text-center text-xs text-gray-300 mt-6">
                            KennyLabs Skincare · Admin Portal
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
