import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/withAuth';

// GET /api/products/:id - publik
export async function GET(request, { params }) {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(params.id) },
        });
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}

// PUT /api/products/:id - protected
export async function PUT(request, { params }) {
    const { error } = withAuth(request);
    if (error) return error;

    try {
        const body = await request.json();
        const { name, price, description, image, category, rating, reviews } = body;

        const product = await prisma.product.update({
            where: { id: parseInt(params.id) },
            data: {
                ...(name && { name }),
                ...(price && { price: parseFloat(price) }),
                ...(description !== undefined && { description }),
                ...(image !== undefined && { image }),
                ...(category && { category }),
                ...(rating && { rating: parseFloat(rating) }),
                ...(reviews !== undefined && { reviews: parseInt(reviews) }),
            },
        });

        return NextResponse.json(product);
    } catch (err) {
        if (err.code === 'P2025') {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        console.error('PUT /api/products/:id error:', err);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

// DELETE /api/products/:id - protected
export async function DELETE(request, { params }) {
    const { error } = withAuth(request);
    if (error) return error;

    try {
        await prisma.product.delete({
            where: { id: parseInt(params.id) },
        });
        return NextResponse.json({ success: true, message: 'Product deleted' });
    } catch (err) {
        if (err.code === 'P2025') {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        console.error('DELETE /api/products/:id error:', err);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
