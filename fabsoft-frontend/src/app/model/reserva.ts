import { Servico } from './servico';

export class Reserva {
    id?: number;
    dataCheckIn: string = '';
    dataCheckOut: string = ''; 
    status: string = 'Pendente';
    listaServicos: Servico[] = [];
}