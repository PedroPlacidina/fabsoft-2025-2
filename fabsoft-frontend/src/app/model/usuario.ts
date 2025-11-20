import { Pet } from './pet';
import { Reserva } from './reserva';

export class Usuario {
    id?: number; 
    nome: string = '';
    email: string = '';
    telefone: string = '';
    senha: string = '';
    tipo: string = 'cliente'; 

    pets: Pet[] = [];
    reservas: Reserva[] = [];

    constructor() {
        this.nome = '';
        this.email = '';
        this.telefone = '';
        this.senha = '';
        this.tipo = 'cliente';
        this.pets = [];
        this.reservas = [];
    }
}