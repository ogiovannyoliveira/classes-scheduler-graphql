import { Module } from '@nestjs/common';
import { TeachersResolver } from './infra/graphql/resolvers/Teachers.resolver';

@Module({
  providers: [TeachersResolver]
})
export class TeachersModule {}