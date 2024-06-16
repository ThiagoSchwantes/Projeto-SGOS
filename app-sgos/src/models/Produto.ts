export interface Produto {
    produtoId?: number;
    nome: string;
    descricao?: string;
    largura: number;
    altura: number;
    valorM2: number;
    quantidade: number;
    valorUnitario: number;
    valorSubTotal: number;
    criadoEm: Date;
    equipamentoId: number;
    equipamento: Equipamento | null;
    acabamentoId: number;
    acabamento: Acabamento | null;
}
  
export interface Equipamento {
    equipamentoId: number;
}
  
export interface Acabamento {
    acabamentoId: number;
}
  