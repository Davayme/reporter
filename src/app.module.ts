import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ServerModule } from './server/server.module';


@Module({
  imports: [AdminModule, ServerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
