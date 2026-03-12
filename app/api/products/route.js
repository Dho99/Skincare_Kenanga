import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import { withAuth } from '@/lib/withAuth';

// GET - Ambil semua produk (publik)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        let query = supabase.from('products').select('*').order('id', { ascending: true });
        if (category) {
            query = query.eq('category', category);
        }

        const { data: products, error } = await query;

        if (error) throw error;
        return NextResponse.json(products);
    } catch (error) {
        console.error('GET /api/products error:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

// POST - Buat produk baru (protected)
export async function POST(request) {
    const { error: authError } = withAuth(request);
    if (authError) return authError;

    try {
        const body = await request.json();
        const { name, price, description, image, category, rating, reviews } = body;

        if (!name || !price) {
            return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
        }

        const { data: product, error } = await supabase
            .from('products')
            .insert({
                name,
                price: parseFloat(price),
                description: description || '',
                image: image || '/produk.jpg',
                category: category || 'star',
                rating: parseFloat(rating) || 4.5,
                reviews: parseInt(reviews) || 0,
            })
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json(product, { status: 201 });
    } catch (err) {
        console.error('POST /api/products error:', err);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
