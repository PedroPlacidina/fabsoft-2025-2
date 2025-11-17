export class Usuario {
    id: number = 0;
    nome: string = '';
    email: string = '';
    telefone: string = '';
    senha: string = '';
    tipo: string = 'cliente';
    
    constructor() {
        this.id = 0;
        this.nome = '';
        this.email = '';
        this.telefone = '';
        this.senha = '';
        this.tipo = 'cliente';
    }
}