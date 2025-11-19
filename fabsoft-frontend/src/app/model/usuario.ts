export class Usuario {
    id?: number; 
    nome: string = '';
    email: string = '';
    telefone: string = '';
    senha: string = '';
    tipo: string = 'cliente'; 


    constructor() {
        this.nome = '';
        this.email = '';
        this.telefone = '';
        this.senha = '';
        this.tipo = 'cliente';
    }
}