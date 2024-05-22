import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/UserModule';


@Module({
  imports: [AdminModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
