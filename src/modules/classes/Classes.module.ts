import { Module } from '@nestjs/common';

import { ClassesResolver } from './infra/graphql/resolvers/Classes.resolver';
import { ClassesRepository } from './infra/typeorm/repositories/ClassesRepository';

@Module({
  providers: [
    ClassesResolver,
    {
      provide: 'ClassesRepository',
      inject: [ClassesRepository],
      useClass: ClassesRepository,
    },
  ],
})
export class ClassesModule {}
