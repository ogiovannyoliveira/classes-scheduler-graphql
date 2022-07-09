interface IDateManipulation {
  isAfter(firstDate: Date, secondDate: Date): boolean;
  diffInDays(firstDate: Date, secondDate: Date): number;
  addHours(hours: number, guestDate?: Date): Date;
}

export { IDateManipulation };
