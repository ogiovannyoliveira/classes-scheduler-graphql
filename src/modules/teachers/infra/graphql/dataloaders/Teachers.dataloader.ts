import * as DataLoader from 'dataloader';

import { FindTeachersByIdsUseCase } from '~modules/teachers/useCases/findTeachersByIds/FindTeachersByIds.useCase';

import { Teacher } from '../../typeorm/entities/Teacher';

function createTeachersLoader(
  findTeachers: FindTeachersByIdsUseCase,
): DataLoader<string, Teacher> {
  return new DataLoader<string, Teacher>(async (ids) => {
    const teachers = await findTeachers.execute(ids);

    const teachersMap = new Map<string, Teacher>();

    teachers.forEach((teacher) => {
      teachersMap.set(teacher.id, teacher);
    });

    return ids.map((id) => teachersMap.get(id));
  });
}

export { createTeachersLoader };
