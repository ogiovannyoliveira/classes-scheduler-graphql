import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';

import { Student } from '~modules/students/infra/typeorm/entities/Student';
import { IStudentsRepository } from '~modules/students/repositories/IStudentsRepository';
import { Teacher } from '~modules/teachers/infra/typeorm/entities/Teacher';
import { ITeachersRepository } from '~modules/teachers/repositories/ITeachersRepository';

import { IDateManipulation } from '~providers/DateManipulationProvider/interfaces/IDateManipulation';

import { AuthPermissions } from '../../infra/abstracts/Auth';
import { IAuthRepository } from '../../repositories/IAuthRepository';
import { CredentialType, LoginType } from './Login.types';

interface IUnionRepositories {
  findByEmail(email: string): Promise<Student | Teacher>;
}

class LoginUseCase {
  constructor(
    private jwtService: JwtService,
    @Inject('AuthRepository')
    private authRepository: IAuthRepository,
    @Inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
    @Inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,
    @Inject('DayjsProvider')
    private dayjsProvider: IDateManipulation,
  ) {}

  async execute(
    userType: AuthPermissions,
    { email, password, provider }: LoginType,
  ): Promise<CredentialType> {
    const DEFAULT_ERROR_MESSAGE = 'Invalid e-mail or password provided.';

    const user = await this.user(userType).findByEmail(email);

    if (!user) {
      throw new BadRequestException(DEFAULT_ERROR_MESSAGE);
    }

    const auth = await this.authRepository.findByUserIdAndProvider(
      user.id,
      provider,
    );

    if (!auth) {
      throw new BadRequestException(DEFAULT_ERROR_MESSAGE);
    }

    const passwordIsCorrect = compareSync(password, user.password);

    if (!passwordIsCorrect) {
      throw new BadRequestException(DEFAULT_ERROR_MESSAGE);
    }

    const token = this.jwtService.sign({
      ...auth,
    });
    const { JWT_EXPIRATION_IN_HOURS } = process.env;

    return {
      access_token: token,
      expires_at: this.dayjsProvider.addHours(+JWT_EXPIRATION_IN_HOURS),
      user: {
        id: user.id,
        social_id: auth.social_id,
        permission: auth.permission,
        provider,
      },
    };
  }

  user(userType: AuthPermissions): IUnionRepositories {
    switch (userType) {
      case AuthPermissions.STUDENT:
        return this.studentsRepository;
      case AuthPermissions.TEACHER:
        return this.teachersRepository;
      default:
        return this.studentsRepository;
    }
  }
}

export { LoginUseCase };
