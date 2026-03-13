import RenderingBadge from "./RenderingBadge";
import { Quote } from "lucide-react";
import Image from "next/image";

async function getTestimonials() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/testimonials`, {
            cache: "no-store", // SSR: Dynamic fetch on every request
        });
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        return res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
}

export default async function Testimonials() {
    const testimonials = await getTestimonials();

    return (
        <section className="py-24 bg-fabish-pink text-fabish-text relative overflow-hidden rounded-t-[4rem]">
            <RenderingBadge mode="SSR" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20 animate-fade-in">
                    <h2 className="text-4xl lg:text-5xl font-serif font-medium mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-fabish-lime/80 font-sans tracking-wide uppercase text-sm">
                        Real Stories, Real Results
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {testimonials.map((testimonial, idx) => (
                        <div key={testimonial.id} className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 relative hover:bg-white/20 transition-colors duration-300">
                            <Quote className="absolute top-8 right-8 w-12 h-12 text-fabish-lime/20" />
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-14 h-14 bg-fabish-cream rounded-full border-2 border-fabish-lime p-1 relative">
                                    <div className="w-full h-full rounded-full overflow-hidden relative">
                                        <Image
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-fabish-text font-serif text-lg">{testimonial.name}</h4>
                                    <p className="text-xs text-fabish-lime font-medium uppercase tracking-wider">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-fabish-text/80 italic leading-relaxed mb-6 font-light">
                                {`"${testimonial.content}"`}
                            </p>
                            <div className="flex text-fabish-lime text-sm space-x-1">
                                {"★".repeat(testimonial.rating)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
