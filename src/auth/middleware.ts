import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';


export const getUser = async(jwtToken: string) => {
    try {
        if (!jwtToken) {
          throw new Error('Not Authorized!')
        }
        const user = jwt.verify(jwtToken, process.env.jwtSecret as string);
        return user;
      } catch (error) {
        return null;
      }
}

export const context = async ({ req, res }: {req: Request, res: Response}) => {
   
    // get user token from the headers
    const authHeader = req.headers.authorization || '';

    if (!authHeader) {
        return;
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new Error("Authorization header does not have a correct format!");
    }
    
    const jwtToken = authHeader.split(' ')[1]; 

    // retrieve a user with the token
    const user = await getUser(jwtToken);

    if (!user) {
        throw new Error('User is not authenticated');
    }
    // add user to context
    return { user };
}



