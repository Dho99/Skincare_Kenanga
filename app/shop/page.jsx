import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RenderingBadge from "@/components/RenderingBadge";
import Image from "next/image";
import { Star } from "lucide-react";

async function getAllProducts() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/products`,
            {
                cache: "no-store",
            },
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const metadata = {
    title: "Shop | KennyLabs Skincare",
    description: "Browse our full collection of premium skincare products.",
};

export default async function ShopPage() {
    const products = await getAllProducts();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <RenderingBadge mode="SSR" />

                <div className="text-center mb-16">
                    <h1 className="text-5xl font-serif text-fabish-text mb-4">
                        Shop All Products
                    </h1>
                    <p className="text-gray-500 font-sans max-w-2xl mx-auto">
                        Explore our complete range of skincare solutions
                        designed to reveal your natural glow.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group">
                            <div className="relative h-[450px] bg-fabish-cream rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-fabish-green/10 border border-transparent hover:border-fabish-green/20">
                                {/* Image */}
                                <div className="absolute inset-0 flex items-center justify-center p-8 group-hover:scale-105 transition-transform duration-700">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-8"
                                    />
                                </div>

                                {/* Price Tag */}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-fabish-text shadow-sm border border-gray-100">
                                    ${product.price}
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/90 to-transparent pt-12">
                                    <h3 className="text-2xl font-serif text-fabish-text mb-1">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center space-x-1 text-fabish-lime mb-3">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="text-fabish-text/60 text-xs ml-1">
                                            {product.rating} ({product.reviews}{" "}
                                            reviews)
                                        </span>
                                    </div>
                                    <button className="w-full bg-fabish-text text-white py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-fabish-green transition-colors font-medium">
                                        <span>Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
