import * as DataLoader from 'dataloader';

import { FindClassesByIdsUseCase } from '~modules/classes/useCases/FindClassesByIdsUseCase/FindClassesByIdsUseCase.useCase';

import { Class } from '../../typeorm/entities/Class';

function createClassesLoader(
  findClasses: FindClassesByIdsUseCase,
): DataLoader<string, Class> {
  return new DataLoader<string, Class>(async (ids) => {
    const classes = await findClasses.execute(ids);

    const classesMap = new Map<string, Class>();

    classes.forEach((classy) => {
      classesMap.set(classy.id, classy);
    });

    return ids.map((id) => classesMap.get(id));
  });
}

export { createClassesLoader };
