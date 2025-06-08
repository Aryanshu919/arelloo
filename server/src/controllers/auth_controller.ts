import { Request, Response } from "express";
import prisma from "../db";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt";
import { loginSchema, registerSchema } from "../utils/validators/auth_validator";

const COOKIE_NAME = 'auth-cookie'

export const register = async (req: Request, res : Response): Promise<void> => {
 console.log('logging the req', req);
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        const errors = result.error.format();
     res.status(400).json({ message: 'Validation failed', errors });
     return;
    }

    const {email, password, name } = result.data;
    console.log("logging the data", result)

    const existingUser = await prisma.user.findUnique({where: { email}});
    if(existingUser){
        res.json({
            msg: "user already exist"
        })
        return ;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const token = generateToken(user.id);
  res
    .cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({ message: 'User registered', user: { id: user.id, email: user.email, name: user.name } });
    

};


export const login = async(req: Request, res: Response) : Promise<void> =>{
   
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        const errors = result.error.format();
        res.status(400).json({ message: 'Validation failed', errors });
        return;
    }

    const { email, password } = result.data;
    const user = await prisma.user.findUnique({where:{email}});
    if(!user){
        res.status(400).json({ msg: "invalid credentials"})
        return;
    }

    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user.id);
    res
        .cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({ message: 'Login successful', user: { id: user.id, email: user.email, name: user.name } });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME).json({ message: 'Logged out' });
};