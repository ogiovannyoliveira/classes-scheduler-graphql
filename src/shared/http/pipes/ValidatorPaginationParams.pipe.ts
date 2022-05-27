import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

import { PaginationInput, PaginationOutput } from './PaginationInput';

class ValidatorPaginationParamsPipe implements PipeTransform {
  transform(value: PaginationInput, _: ArgumentMetadata): PaginationOutput {
    const transformedValue: PaginationOutput = {
      take: value?.amount || 10,
      skip: value?.page ? (value.page - 1) * value.amount : 0,
    };

    const isValidTakenQuantity =
      transformedValue.take &&
      transformedValue.take > 0 &&
      transformedValue.take <= 100;

    if (!isValidTakenQuantity) {
      throw new BadRequestException('Provide a valid value for take');
    }

    return transformedValue;
  }
}

type PaginationParams = {
  page: number;
  amount: number;
};

export { ValidatorPaginationParamsPipe, PaginationParams };
