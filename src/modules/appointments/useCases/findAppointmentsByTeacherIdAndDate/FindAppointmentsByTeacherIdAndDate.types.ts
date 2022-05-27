import { AppointmentInterface } from '~modules/appointments/infra/graphql/interfaces/AppointmentInterface';

type FindAppointmentsByTeacherIdAndDateOutput = {
  data: AppointmentInterface[];
  total: number;
};

export { FindAppointmentsByTeacherIdAndDateOutput };
