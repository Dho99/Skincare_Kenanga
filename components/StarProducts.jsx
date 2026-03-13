import RenderingBadge from "./RenderingBadge";
import ProductSlider from "./ProductSlider";

async function getProducts() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/products?category=star`,
            {
                cache: "no-store", // Disable cache to ensure new images load immediately
            },
        );
        console.log(res);
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
}

export default async function StarProducts() {
    const products = await getProducts();

    return (
        <section
            id="shop-by-product"
            className="py-24 bg-white relative overflow-hidden"
        >
            <RenderingBadge mode="ISR" />
            <ProductSlider products={products} />
        </section>
    );
}
