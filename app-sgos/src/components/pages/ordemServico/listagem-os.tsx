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
            .catch((error) => {
                console.error('Erro ao listar ordem:', error)
                setOrdens([]);
            });
    }

    function excluirOrdem(ordemId: number) {
        axios.delete(`http://localhost:5223/ordem-servico/deletar/${ordemId}`)
            .then(() => {
                carregarOrdens();
            })
            .catch((error) => console.error('Erro ao excluir ordem:', error));
    }

    function button(ordemId: number, status: Status){
        
        if(status == Status["Em Producao"] || status == Status["Em Acabamento"]){
            return(
                <div>
                    <button className="btn mr-2 me-2" style={{backgroundColor: 'red', color: 'white'}} onClick={() => {excluirOrdem(ordemId)}}>Deletar</button>
                    <Link to={`/pages/ordemServico/alterar/${ordemId}`} className="btn  me-2" style={{backgroundColor: '#39F700', color: 'black'}}>Alterar</Link>
                    <button className="btn mr-2 " style={{backgroundColor: 'orange', color: 'black'}} onClick={() => {alterarStatus(ordemId)}}>Alterar Status</button>
                </div>
            );
        }else if(status == Status["Pronto Para Entrega"]){
            return(
                <div>
                    <button className="btn mr-2 me-2" style={{backgroundColor: 'red', color: 'white'}} onClick={() => {excluirOrdem(ordemId)}}>Deletar</button>
                    <Link to={`/pages/ordemServico/alterar/${ordemId}`} className="btn me-2" style={{backgroundColor: '#39F700', color: 'black'}}>Alterar</Link>
                    <Link to={`/pages/ordemServico/solicitarBaixa/${ordemId}`} className="btn" style={{backgroundColor: 'black', color: 'white'}}>Solicitar Baixa</Link>
                </div>
            );
        }else if(status == Status["Solicitado Baixa"]){
            return(
                <div>Já foi solicitado a baixa</div>
            );
        }else if(status == Status.Baixada){
            return(
                <div>A Ordem de Serviço já foi finalizada</div>
            );
        }
    }

    function alterarStatus(ordemId: number) {
        axios.put(`http://localhost:5223/ordem-servico/alterarStatus/${ordemId}`)
            .then(() => {
                carregarOrdens();
            })
            .catch((error) => console.error('Erro ao excluir ordem:', error));
    }


    function lista(){

        if(ordens.length == 0){
            return(
                <tr>
                    <td colSpan={8}>Nenhuma Ordem de serviço cadastrada</td>
                </tr>
            );
        }else{
            return(
                ordens.map(ordem => (
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
                                
                                {button(ordem.ordemServicoId!, ordem.status!)}
                            </div>
                        </td>
                    </tr>
                ))
            );
        }
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
                    {lista()}
                </tbody>
            </table>
            </div>
            </div>
        </div>
    );
}

export default ListarOS;
