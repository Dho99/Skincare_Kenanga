"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("admin_token");
        const isLoginPage = pathname === "/admin/login";

        if (!token && !isLoginPage) {
            router.replace("/admin/login");
        } else {
            setChecked(true);
        }
    }, [pathname, router]);

    // Halaman login tidak butuh auth check
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    // Tampilkan loading sementara cek token
    if (!checked) {
        return (
            <div className="min-h-screen bg-pink-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-pink-300 border-t-pink-500 rounded-full animate-spin" />
                    <p className="text-sm text-pink-400 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
