import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/User.model';

class AuthService {
  async register(data: any) {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      const error: any = new Error('Email already registered');
      error.status = 409;
      throw error;
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
      const error: any = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      const error: any = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return token;
  }
}

export default new AuthService();
