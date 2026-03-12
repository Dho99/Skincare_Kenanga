import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import { withAuth } from '@/lib/withAuth';

// GET /api/products/:id - publik
export async function GET(request, { params }) {
    try {
        const { data: product, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', parseInt(params.id))
            .single();

        if (error || !product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}

// PUT /api/products/:id - protected
export async function PUT(request, { params }) {
    const { error: authError } = withAuth(request);
    if (authError) return authError;

    try {
        const body = await request.json();
        const { name, price, description, image, category, rating, reviews } = body;

        const updateData = {
            ...(name && { name }),
            ...(price && { price: parseFloat(price) }),
            ...(description !== undefined && { description }),
            ...(image !== undefined && { image }),
            ...(category && { category }),
            ...(rating && { rating: parseFloat(rating) }),
            ...(reviews !== undefined && { reviews: parseInt(reviews) }),
            updated_at: new Date().toISOString(),
        };

        const { data: product, error } = await supabase
            .from('products')
            .update(updateData)
            .eq('id', parseInt(params.id))
            .select()
            .single();

        if (error || !product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json(product);
    } catch (err) {
        console.error('PUT /api/products/:id error:', err);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

// DELETE /api/products/:id - protected
export async function DELETE(request, { params }) {
    const { error: authError } = withAuth(request);
    if (authError) return authError;

    try {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', parseInt(params.id));

        if (error) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: 'Product deleted' });
    } catch (err) {
        console.error('DELETE /api/products/:id error:', err);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
