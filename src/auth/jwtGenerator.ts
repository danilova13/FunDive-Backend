import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWTPayload } from './types';

// function that generates jwt
export function jwtGenerator(id: number): string {
    const payload: JWTPayload = {
        userId: id,
    }
    try {
        return jwt.sign(payload, process.env.jwtSecret as string, { expiresIn: "10h" });
    } catch (error) {
        console.error("Error generating JWT:", error);
        throw error;
    }
}
