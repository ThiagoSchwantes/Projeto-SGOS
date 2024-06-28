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
    cliente?: Cliente;

    vendedorId: number;
    vendedor?: Vendedor;

    produtos?: Produto[];
    pagamentos?: Pagamento[];
}

export enum Status {
    "Em Producao" = 0,
    "Em Acabamento" = 1,
    "Pronto Para Entrega" = 2,
    "Solicitado Baixa" = 3,
    "Baixada" = 4
}