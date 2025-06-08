export interface UserPayload {
  userId: string;
  email: string;
}

declare module 'express' {
  export interface Request {
    user?: {
      userId: string;
    };
  }
}
