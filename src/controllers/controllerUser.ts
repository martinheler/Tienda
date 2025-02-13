import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config as dotenvConfig } from 'dotenv';
import { Log } from '../models/logs';


dotenvConfig();

export const registerUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    console.log("📌 Received Registration Data:", req.body);

    // ✅ Validate input fields
    if (!email || !password) {
      console.error("❌ Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    // ✅ Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      orders_count: 0
    });

    await Log.create({ action: "Usuario registrado", user: email });
    return res.status(201).json({ message: 'Usuario registrado exitosamente', user });
  } catch (error: any) {
    console.error("Error in registerUser:", error);

    // ✅ Handle duplicate email error
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.error("❌ Email already exists:");
      return res.status(400).json({ message: "Email must be unique" });
    }
    console.error("❌ Error registering user:", error);
    return res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    // ✅ Validate input fields
    if (!email || !password) {
      console.error("❌ Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.error("❌ Incorrect credentials");
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    console.log("✅ User Created Successfully:", user);
    return res.status(200).json({ token, user_id: user.id });
    
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

