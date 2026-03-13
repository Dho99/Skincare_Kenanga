import { NextResponse } from 'next/server';
import { verifyToken, signToken } from '@/lib/auth';

export async function POST(request) {
    try {
        const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'No token provided' }, { status: 401 });
        }

        const oldToken = authHeader.split(' ')[1];

        // Verifikasi token (catatan: pada kasus nyata refresh token biasanya terpisah
        // fungsinya dari access token. Di sini kita buat versi sederhananya dimana 
        // access token yang masih valid dikirim ulang untuk di-perpanjang durasinya).
        const payload = verifyToken(oldToken);

        if (!payload) {
            return NextResponse.json({ error: 'Invalid or expired token. Cannot refresh.' }, { status: 401 });
        }

        // Hapus `iat` dan `exp` dari payload lama agar signToken mengenerate waktu baru
        const { iat, exp, ...newPayload } = payload;

        // Generate token baru dengan durasi penuh
        const newToken = signToken(newPayload);

        return NextResponse.json({
            success: true,
            token: newToken
        });

    } catch (error) {
        console.error('Refresh token error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
