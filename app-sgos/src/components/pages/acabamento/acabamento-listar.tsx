import { useEffect, useState } from "react";
import { Acabamento } from "../../../models/Acabamento";
import { format } from 'date-fns';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
        <div>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Cadastrado Em</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Ações</th>
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
                                <button onClick={() => {excluirAcabamento(acabamento.acabamentoId!)}}>Deletar</button>
                                <button><Link to={`/pages/acabamento/alterar/${acabamento.acabamentoId}`}>Alterar</Link></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AcabamentoListar;
