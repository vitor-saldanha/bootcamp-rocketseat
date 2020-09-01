import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/Appointment';
import CreateAppointmentService from '../services/CreateAppointmentServices';

const appointmentRouter = Router();
const appointmentsRepository = new AppointmentRepository();

// Isso esta dizendo que eh um array de Appointment
// const appointments: Appointment[] = [];

appointmentRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.returnAll();

    return response.json(appointments);
});

appointmentRouter.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(
            appointmentsRepository,
        );

        const appointment = createAppointment.execute({
            date: parsedDate,
            provider,
        });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentRouter;
