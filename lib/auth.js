import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'kennylabs-admin-secret-key-2024';
const JWT_EXPIRES_IN = '8h';

export function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
}
