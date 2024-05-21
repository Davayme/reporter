import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'defaultSecret',
  signOptions: {
    expiresIn: '60s',
  },
}));
