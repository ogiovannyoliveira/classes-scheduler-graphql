abstract class AbstractSchedule {
  id: string;
  class_id: string;
  appointment_id: string;
  student_id: string;
  attended?: boolean;
  created_at: Date;
  updated_at?: Date;
}

export { AbstractSchedule };
