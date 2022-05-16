import { Injectable } from '@nestjs/common';

@Injectable()
class CreateClassUseCase {
  async execute(): Promise<boolean> {
    return true;
  }
}

export { CreateClassUseCase };
