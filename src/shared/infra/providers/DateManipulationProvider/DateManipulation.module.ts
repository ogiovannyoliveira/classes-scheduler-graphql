import { Module } from '@nestjs/common';

import { DayjsImplementation } from './implementations/DayjsImplementation';

@Module({
  providers: [
    {
      provide: 'DayjsProvider',
      inject: [DayjsImplementation],
      useClass: DayjsImplementation,
    },
  ],
  exports: [
    {
      provide: 'DayjsProvider',
      inject: [DayjsImplementation],
      useClass: DayjsImplementation,
    },
  ],
})
export class DateManipulationProviderModule {}
