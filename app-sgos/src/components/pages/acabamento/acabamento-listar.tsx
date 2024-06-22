import { useEffect, useState } from "react";
import { Acabamento } from "../../../models/Acabamento";
import { format } from 'date-fns';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsTrash, BsPencil } from 'react-icons/bs';

function AcabamentoListar() {
    const [acabamento, setAcabamento] = useState<Acabamento[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        carregarAcabamento();
    }, []);

    function carregarAcabamento() {
        fetch("http://localhost:5223/acabamentos/listar")
            .then((resposta) => resposta.json())
            .then((acabamentos: Acabamento[]) => {
                console.table(acabamentos);
                setAcabamento(acabamentos);
            });
    }

    function excluirAcabamento(acabamentoId: number) {
        axios.delete(`http://localhost:5223/acabamentos/deletar/${acabamentoId}`)
            .then((resposta) => {
                setAcabamento(resposta.data);
            })
            .catch((error) => console.error('Erro ao excluir acabamento:', error));
    }
            

    return (
        <div className="d-flex vh-100">
            <div className="container my-auto text-center">
            <h2>Lista de Acabamentos</h2>
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
                            {acabamento.map(acabamento => (
                                <tr key={acabamento.acabamentoId}>
                                    <td>{acabamento.acabamentoId}</td>
                                    <td>{acabamento.criadoEm ? format(new Date(acabamento.criadoEm), 'dd/MM/yyyy') : 'N/A'}</td>
                                    <td>{acabamento.nome}</td>
                                    <td>{acabamento.descricao}</td>
                                    
                                    <td>
                                        <div className="btn-group" role="group">
                                            <button  className="btn mr-2" style={{backgroundColor: 'red', color: 'white'}} onClick={() => {excluirAcabamento(acabamento.acabamentoId!)}}><BsTrash /></button>
                                            <Link to={`/pages/acabamento/alterar/${acabamento.acabamentoId}`} className="btn" style={{backgroundColor: '#39F700', color: 'black'}}><BsPencil /></Link>
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

export default AcabamentoListar;
