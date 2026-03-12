import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/withAuth';

// GET - Ambil semua produk (publik)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        const products = await prisma.product.findMany({
            where: category ? { category } : undefined,
            orderBy: { id: 'asc' },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('GET /api/products error:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

// POST - Buat produk baru (protected)
export async function POST(request) {
    const { error } = withAuth(request);
    if (error) return error;

    try {
        const body = await request.json();
        const { name, price, description, image, category, rating, reviews } = body;

        if (!name || !price) {
            return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                name,
                price: parseFloat(price),
                description: description || '',
                image: image || '/produk.jpg',
                category: category || 'star',
                rating: parseFloat(rating) || 4.5,
                reviews: parseInt(reviews) || 0,
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (err) {
        console.error('POST /api/products error:', err);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
