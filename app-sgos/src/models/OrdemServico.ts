import { Cliente } from './Cliente';
import { Vendedor } from './Vendedor';
import { Produto } from './Produto';
import { Pagamento } from './Pagamento';


export interface OrdemServico {
    ordemServicoId?: number;
    valorTotal?: number;
    valorDesconto?: number;
    valorAPagar?: number;
    observacoes?: string;
    dataHorarioAbertura?: Date;
    status?: Status;
    clienteId: number;
    vendedorId: number;
    produtos?: Produto[];
    pagamentos?: Pagamento[];
}

export enum Status {
    EmProducao = 0,
    EmAcabamento = 1,
    ProntoParaEntrega = 2,
    SolicitadoBaixa = 3,
    Baixada = 4
}