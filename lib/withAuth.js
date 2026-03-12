import { NextResponse } from 'next/server';
import { verifyToken } from './auth';

/**
 * Middleware guard untuk endpoint yang butuh autentikasi JWT.
 * Gunakan: const { payload, error } = withAuth(request);
 */
export function withAuth(request) {
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return {
            error: NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 }),
        };
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);

    if (!payload) {
        return {
            error: NextResponse.json({ error: 'Unauthorized: Invalid or expired token' }, { status: 401 }),
        };
    }

    return { payload };
}
