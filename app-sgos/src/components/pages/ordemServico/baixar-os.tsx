import { useEffect, useState } from "react";
import { format, set } from 'date-fns';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { OrdemServico, Status } from "../../../models/OrdemServico";


function BaixarOS() {
    const [ordens, setOrdens] = useState<OrdemServico[]>([]);
    const navigate = useNavigate();

    function getStatusName(status: any) {
        return Status[status];
    }

    useEffect(() => {
        carregarOrdens();
    }, []);

    function carregarOrdens() {
        axios.get("http://localhost:5223/solicitar-baixa/listar")
            .then(resposta =>{
                setOrdens(resposta.data);
            })
            .catch((error) => console.error('Erro ao listar ordem:', error));
    }    

    function autorizarBaixa(id: number){
        axios.patch(`http://localhost:5223/solicitar-baixa/autorizar/${id}`)
        .then(()=>{
            carregarOrdens();
        })
        .catch((error) => console.error('Erro ao listar ordem:', error));
    }

    function lista(){
        if(ordens.length == 0){
            return(
                <tr>
                    <td colSpan={8}>Nenhuma Ordem de serviço solicitada para baixa</td>
                </tr>
            );
        }
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
                        <button className="btn mr-2" style={{backgroundColor: 'green', color: 'white'}} onClick={() => {autorizarBaixa(ordem.ordemServicoId!)}}>Autorizar</button>
                    </div>
                </td>
            </tr>
        )));
    }

    return (
        <div className="d-flex vh-100">
            <div className="container my-auto text-center">
            <h2>Lista de Solicitação de Baixa</h2>
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

export default BaixarOS;
