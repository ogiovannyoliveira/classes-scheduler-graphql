import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeachersModule } from '~modules/teachers/Teachers.module';
import { ClassesModule } from '~modules/classes/Classes.module';

import databaseConfig from './shared/infra/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.SHOW_PLAYGROUND == 'true',
      autoSchemaFile: join(process.cwd(), 'src', 'schema.gql'),
    }),
    TeachersModule,
    ClassesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
