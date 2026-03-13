import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        // 1. Cek apakah username sudah ada
        const { data: existingAdmin } = await supabase
            .from('admins')
            .select('id')
            .eq('username', username)
            .single();

        if (existingAdmin) {
            return NextResponse.json(
                { error: 'Username already taken' },
                { status: 409 }
            );
        }

        // 2. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Simpan ke Supabase
        const { data: admin, error } = await supabase
            .from('admins')
            .insert({
                username,
                password: hashedPassword
            })
            .select()
            .single();

        if (error) {
            throw error; // Lempar ke catch block
        }

        return NextResponse.json({
            success: true,
            message: 'Admin registered successfully',
            admin: { id: admin.id, username: admin.username }
        }, { status: 201 });

    } catch (error) {
        console.error('Register error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
