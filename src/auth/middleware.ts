import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { GraphQLContext, JWTPayload } from './types';


export const getUser = async(jwtToken: string): Promise<JWTPayload | null> => {
    try {
        if (!jwtToken) {
          throw new Error('Not Authorized!')
        }
        const user = jwt.verify(jwtToken, process.env.jwtSecret as string);
        return user as JWTPayload;
      } catch (error) {
        return null;
      }
}

export const context = async ({ req, res }: {req: Request, res: Response}): Promise<GraphQLContext> => {
   
    // get user token from the headers
    const authHeader = req.headers.authorization || '';

    if (!authHeader) {
        return {};
    }

    const [ bearer, jwtToken ] = authHeader.split(' '); 

    if (bearer !== "Bearer") {
      throw new Error("Authorization header does not have a correct format!");
    }
  
    // retrieve a user with the token
    const user = await getUser(jwtToken);

    if (!user) {
        throw new Error('User is not authenticated');
    }
    // add user to context
    return { user };
}



