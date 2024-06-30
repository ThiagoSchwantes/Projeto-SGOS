import { useEffect, useState } from "react";
import { Equipamento } from "../../../models/Equipamento";
import { format } from 'date-fns';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function EquipamentoListar() {
    const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        carregarEquipamentos();
    }, []);

    function carregarEquipamentos() {
        axios.get("http://localhost:5223/equipamentos/listar")
        .then(resposta =>{
            setEquipamentos(resposta.data);
        })
        .catch((error) => {
            console.error('Erro ao listar:', error)
            setEquipamentos([]);
        });
    }

    function excluirEquipamento(equipamentoId: number) {
        axios.delete(`http://localhost:5223/equipamentos/deletar/${equipamentoId}`)
            .then((resposta) => {
                setEquipamentos(resposta.data);
            })
            .catch((error) => console.error('Erro ao excluir equipamento:', error));
    }

    function lista(){
        if(equipamentos.length == 0){
            return(
                <tr>
                    <td colSpan={5}>Nenhum equipamento cadastrado</td>
                </tr>
            );
        }else{
            return(
                equipamentos.map(equipamento => (
                    <tr key={equipamento.equipamentoId}>
                        <td>{equipamento.equipamentoId}</td>
                        <td>{equipamento.criadoEm ? format(new Date(equipamento.criadoEm), 'dd/MM/yyyy') : 'N/A'}</td>
                        <td>{equipamento.nome}</td>
                        <td>{equipamento.descricao}</td>
                        <td>
                            <div className="btn-group" role="group">
                                <button className="btn mr-2" style={{backgroundColor: 'red', color: 'white'}} onClick={() => {excluirEquipamento(equipamento.equipamentoId!)}}>Deletar</button>
                                <Link to={`/pages/equipamento/alterar/${equipamento.equipamentoId}`} className="btn" style={{backgroundColor: '#39F700', color: 'black'}}>Alterar</Link>
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
            <h2>Lista de Equipamentos</h2>
                <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover mt-2">
                <thead>
                    <tr className="table">
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Código</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Criado Em</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Nome</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Descrição</th>
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

export default EquipamentoListar;
