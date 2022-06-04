import * as dayjs from 'dayjs';

import { IDateManipulation } from '../interfaces/IDateManipulation';

class DayjsFake implements IDateManipulation {
  isAfter(firstDate: Date, secondDate: Date): boolean {
    return dayjs(firstDate).isAfter(secondDate);
  }

  diffInDays(firstDate: Date, secondDate: Date): number {
    return dayjs(firstDate).diff(secondDate, 'day');
  }
}

export { DayjsFake };
