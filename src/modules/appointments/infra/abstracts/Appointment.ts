abstract class AbstractAppointment {
  id: string;
  class_id: string;
  responsible_id: string;
  starts_at: Date;
  finishes_at: Date;
  created_at: Date;
  updated_at?: Date;
}

export { AbstractAppointment };
