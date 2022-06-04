interface IDateManipulation {
  isAfter(firstDate: Date, secondDate: Date): boolean;
  diffInDays(firstDate: Date, secondDate: Date): number;
}

export { IDateManipulation };
