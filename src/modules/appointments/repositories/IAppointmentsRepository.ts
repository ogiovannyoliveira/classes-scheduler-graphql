interface IAppointmentsRepository {
  create(): Promise<boolean>;
}

export { IAppointmentsRepository };
