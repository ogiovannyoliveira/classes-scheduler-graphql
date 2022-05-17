import { Module } from '@nestjs/common';

import { LevelsResolver } from './infra/graphql/resolvers/Levels.resolver';

@Module({
  providers: [LevelsResolver],
})
export class LevelsModule {}
