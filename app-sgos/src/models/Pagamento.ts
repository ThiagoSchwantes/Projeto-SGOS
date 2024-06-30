export interface Pagamento{
    pagamentoId?: number;
    valor: number;
    forma: Forma;
}

export enum Forma {
    Indefinido = -1,
    Dinheiro = 0,
    CartaoCredito = 1,
    CartaoDebito = 2,
    Boleto = 3,
}