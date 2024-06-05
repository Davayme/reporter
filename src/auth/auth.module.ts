import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './application/services/auth.service';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { JwtStrategy } from './application/strategies/jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MenuModule } from 'src/menu/menu.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionsGuard } from './infrastructure/guards/permissions.guard';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: '3h' },
      }),
      inject: [ConfigService],
    }),
    MenuModule,
  ],
  providers: [AuthService, JwtStrategy, PrismaService, PermissionsGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
