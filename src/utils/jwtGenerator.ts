import  jwt  from 'jsonwebtoken';

// function that generates jwt
export function jwtGenerator(id: number) {
    const payload = {
        user: id
    }
    try {
        return jwt.sign(payload, process.env.jwtSecret as string, { expiresIn: "1hr" });
    } catch (error) {
        console.error("Error generating JWT:", error);
        throw error;
    }
}
