import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

class ValidatorAmericanDateFormatParamPipe implements PipeTransform {
  transform(value: string, _: ArgumentMetadata): string {
    const REGEX_DATE = /^\d{4}-\d{1,2}-\d{1,2}$/;

    const isValidDate = REGEX_DATE.test(value);

    if (!isValidDate) {
      throw new BadRequestException('Provide the date format YYYY-MM-DD');
    }

    return value;
  }
}

export { ValidatorAmericanDateFormatParamPipe };
