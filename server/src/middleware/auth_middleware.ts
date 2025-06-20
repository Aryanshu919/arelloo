declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { userId: string };
    }
  }
}
import { Request,Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

interface TokenPayload {
  userId: string;
  // email?: string; // Add more if needed
}

export const verifyUser = (req: Request, res: Response, next: NextFunction):void => {
  const token = req.cookies['auth-cookie'];
  if (!token) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  } 

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.user = decoded;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
     res.clearCookie('auth_token');
     res.status(401).json({ message: 'Session expired. Please log in again.' });
     return;
    }
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};
