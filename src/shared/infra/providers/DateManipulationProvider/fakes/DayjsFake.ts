import * as dayjs from 'dayjs';

import { IDateManipulation } from '../interfaces/IDateManipulation';

class DayjsFake implements IDateManipulation {
  isAfter(firstDate: Date, secondDate: Date): boolean {
    return dayjs(firstDate).isAfter(secondDate);
  }
}

export { DayjsFake };
