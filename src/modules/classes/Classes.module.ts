import { Module } from '@nestjs/common';

import { ClassesResolver } from './infra/graphql/resolvers/Classes.resolver';

@Module({
  providers: [ClassesResolver]
})
export class ClassesModule {}