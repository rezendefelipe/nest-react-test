import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelModule } from './channel/channel.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '.db/sql',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [`${__dirname}/migrations/{.ts,*.js}`],
      migrationsRun: true,
    }),
    ChannelModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
