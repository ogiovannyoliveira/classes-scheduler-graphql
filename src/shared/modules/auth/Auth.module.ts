import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Student } from '~modules/students/infra/typeorm/entities/Student';
import { StudentsRepository } from '~modules/students/infra/typeorm/repositories/StudentsRepository';
import { Teacher } from '~modules/teachers/infra/typeorm/entities/Teacher';
import { TeachersRepository } from '~modules/teachers/infra/typeorm/repositories/TeachersRepository';

import { DateManipulationProviderModule } from '~providers/DateManipulationProvider/DateManipulation.module';

import { AuthResolver } from './infra/graphql/resolvers/Auth.resolver';
import { Authentication } from './infra/typeorm/entities/Auth';
import { AuthRepository } from './infra/typeorm/repositories/AuthRepository';
import { JwtStrategy } from './strategies/Jwt.strategy';
import { LoginUseCase } from './useCases/loginUseCase/Login.useCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([Authentication, Student, Teacher]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRATION_TIME'),
          algorithm: 'HS256',
        },
        verifyOptions: { ignoreExpiration: false, algorithms: ['HS256'] },
      }),
    }),
    DateManipulationProviderModule,
  ],
  providers: [
    AuthResolver,
    JwtStrategy,
    LoginUseCase,
    {
      provide: 'AuthRepository',
      inject: [AuthRepository],
      useClass: AuthRepository,
    },
    {
      provide: 'StudentsRepository',
      inject: [StudentsRepository],
      useClass: StudentsRepository,
    },
    {
      provide: 'TeachersRepository',
      inject: [TeachersRepository],
      useClass: TeachersRepository,
    },
  ],
})
export class AuthModule {}
