import { Equipamento } from './Equipamento';
import { Acabamento } from './Acabamento';
import { OrdemServico } from './OrdemServico';

export interface Produto {
    produtoId?: number;
    nome: string;
    descricao?: string;
    largura: number;
    altura: number;
    valorM2: number;
    quantidade: number;
    valorUnitario?: number;
    valorSubTotal?: number;
    criadoEm?: Date;

    equipamento?: Equipamento;
    acabamento?: Acabamento;
    ordemServico?: OrdemServico;

    equipamentoId: number;
    acabamentoId: number;
    ordemServicoId: number;
}

  