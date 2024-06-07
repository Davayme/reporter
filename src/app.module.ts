import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from './common/config/jwt.config';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { ServerModule } from './server/server.module';
import { QueriesModule } from './queries/queries.module';
import { ExecuteQueriesModule } from './execute-queries/execute-queries.module';
import { TemplateModule } from './template/template.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfig],
      isGlobal: true,
    }),
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: configService.get('jwt.signOptions'),
      }),
      inject: [ConfigService],
    }),
    MenuModule,
    AuthModule,
    AdminModule,
    ServerModule,
    QueriesModule,
    ExecuteQueriesModule,
    TemplateModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
