import { useEffect, useState } from "react";
import { format, set } from 'date-fns';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { OrdemServico, Status } from "../../../models/OrdemServico";


function ListarOS() {
    const [ordens, setOrdens] = useState<OrdemServico[]>([]);
    const navigate = useNavigate();

    function getStatusName(status: any) {
        return Status[status];
    }

    useEffect(() => {
        carregarOrdens();
    }, []);

    function carregarOrdens() {
        axios.get("http://localhost:5223/ordem-servico/listar")
            .then(resposta =>{
                setOrdens(resposta.data);
            })
            .catch((error) => console.error('Erro ao listar ordem:', error));
    }

    function excluirOrdem(ordemId: number) {
        axios.delete(`http://localhost:5223/ordem-servico/deletar/${ordemId}`)
            .then((resposta) => {
                setOrdens(resposta.data);
            })
            .catch((error) => console.error('Erro ao excluir ordem:', error));
    }

    function button(ordemId: number, status: Status){
        
        if(status == Status["Em Producao"] || status == Status["Em Acabamento"]){
            return(
                <button className="btn mr-2" style={{backgroundColor: 'black', color: 'white'}} onClick={() => {alterarStatus(ordemId)}}>Alterar Status</button>
            );
        }else if(status == Status["Pronto Para Entrega"]){
            return(
                <Link to={`/pages/ordemServico/solicitarBaixa/${ordemId}`} className="btn" style={{backgroundColor: 'black', color: 'white'}}>Solicitar Baixa</Link>
            );
        }        
    }

    function alterarStatus(ordemId: number) {
        axios.put(`http://localhost:5223/ordem-servico/alterarStatus/${ordemId}`)
            .then((resposta) => {
                carregarOrdens();
            })
            .catch((error) => console.error('Erro ao excluir ordem:', error));
    }

    return (
        <div className="d-flex vh-100">
            <div className="container my-auto text-center">
            <h2>Lista de Ordens de Serviços</h2>
                <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover mt-2">
                <thead>
                    <tr className="table">
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Código</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Cliente</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Vendedor</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Data abertura</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Status</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Valor Total</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Valor a Pagar</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                
                    {ordens.map(ordem => (
                        <tr key={ordem.ordemServicoId}>
                            <td>{ordem.ordemServicoId}</td>
                            <td>{ordem.cliente?.nome}</td>
                            <td>{ordem.vendedor?.nome}</td>
                            <td>{ordem.dataHorarioAbertura ? format(new Date(ordem.dataHorarioAbertura), 'dd/MM/yyyy') : 'N/A'}</td>
                            <td>{getStatusName(ordem.status)}</td>
                            <td>R$ {ordem.valorTotal}</td>
                            <td>R$ {ordem.valorAPagar}</td>
                            <td>
                                <div className="btn-group" role="group">
                                    <button className="btn mr-2" style={{backgroundColor: 'red', color: 'white'}} onClick={() => {excluirOrdem(ordem.ordemServicoId!)}}>Deletar</button>
                                    <Link to={`/pages/ordemServico/alterar/${ordem.ordemServicoId}`} className="btn" style={{backgroundColor: '#39F700', color: 'black'}}>Alterar</Link>
                                    {button(ordem.ordemServicoId!, ordem.status!)}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            </div>
        </div>
    );
}

export default ListarOS;
