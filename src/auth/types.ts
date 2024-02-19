export interface GraphQLContext {
	user?: JWTPayload;
}

export type JWTPayload = {
    userId: number
}