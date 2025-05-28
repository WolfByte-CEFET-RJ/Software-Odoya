import * as Yup from 'yup';
import { CreateEvent, UpdateEvent } from '../../types/event';

const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

const createEventSchema = Yup.object({
    name: Yup.string().required('O nome é obrigatório').min(3, 'O nome deve ter pelo menos 3 caracteres'),
    location: Yup.string().required('A localização é obrigatória'),
    date: Yup.date().required('A data é obrigatória').typeError('A data é obrigatória e precisa estar no formato ISO8601'),
    meetingPoint: Yup.string().required('O ponto de encontro é obrigatório'),
    estimatedDuration: Yup.string().required('O tempo de duração é obrigatório').matches(regex, 'O horário deve estar no formato hh:mm:ss')
});

const updateEventSchema = Yup.object({
    name: Yup.string().optional().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    location: Yup.string().optional(),
    date: Yup.date().optional().typeError('A data precisa estar no formato ISO8601'),
    meetingPoint: Yup.string().optional(),
    estimatedDuration: Yup.string().optional().matches(regex, 'O horário deve estar no formato hh:mm:ss')
});

export default class EventValidator{
    
    public static async validateCreateEvent(eventData: CreateEvent){
        await createEventSchema.validate(eventData, { abortEarly: false });
    }

    public static async validateUpdateEvent(eventData: UpdateEvent){
        await updateEventSchema.validate(eventData, { abortEarly: false });
    }
}