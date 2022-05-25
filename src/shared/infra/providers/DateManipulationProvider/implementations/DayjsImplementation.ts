import * as dayjs from 'dayjs';

import { IDateManipulation } from '../interfaces/IDateManipulation';

class DayjsImplementation implements IDateManipulation {
  isAfter(firstDate: Date, secondDate: Date): boolean {
    return dayjs(firstDate).isAfter(secondDate);
  }
}

export { DayjsImplementation };
