export interface Cliente{
    clienteId?: number;
    dataCadastro?: Date;
    nome: string;
    cpf: string;
    rg: string;
    cep: string;
    endereco: string;
    bairro: string;
    cidade: string;
    telefone: string;
}