import type {
    RequestHandler,
    NextFunction,
    Request,
    Response,
} from 'express';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../model/user';

export const authMiddleware: RequestHandler = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        // destructure the token and get the token from the req header
        const jwtToken = req.header("token");

        // check if token exists
        if(!jwtToken) {
            return res.status(401).send("Not Authorized");
        }
        // check if valid 
        const payload = jwt.verify(jwtToken, process.env.jwtSecret as string);
       
        // allows to access properties of payload in other middlewares and controllers
        req.jwtPayload = payload as JWTPayload;

        next();
    } catch(error) {
        console.error('Not Authorized', error);
        throw error;
    }
}


