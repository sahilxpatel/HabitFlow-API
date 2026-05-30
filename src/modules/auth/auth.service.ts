import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/User.model';
import { AppError } from '../../utils/AppError';

class AuthService {
  async register(data: any) {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new AppError('Email already registered', 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    const userToReturn = newUser.toObject();
    delete (userToReturn as any).password;
    
    return userToReturn;
  }

  async login(data: any) {
    // .select('+password') is used if the password was set to select: false in the model
    // However, since it is not, findOne will return it anyway, but we explicitly request it to match instructions.
    const user = await User.findOne({ email: data.email }).select('+password');
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any }
    );

    return token;
  }
}

export default new AuthService();
