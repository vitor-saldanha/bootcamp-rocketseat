import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface appointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentRepository {
    // ---------- Criar Variaveis -----------------
    // Criar variaveis armazenada com o formato do model
    private appointments: Appointment[];

    // Dizer que essa variavel começa vazia
    constructor() {
        this.appointments = [];
    }

    // ------------- Metodos -------------------
    public returnAll(): Appointment[] {
        return this.appointments;
    }

    public create({ provider, date }: appointmentDTO): Appointment {
        const appointment = new Appointment({ provider, date });

        this.appointments.push(appointment);

        return appointment;
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointmentInSameDate = this.appointments.find(appointment =>
            isEqual(date, appointment.date),
        );

        return findAppointmentInSameDate || null;
    }
}

export default AppointmentRepository;
