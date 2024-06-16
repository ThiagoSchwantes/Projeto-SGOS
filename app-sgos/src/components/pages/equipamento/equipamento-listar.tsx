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
        fetch("http://localhost:5223/equipamentos/listar")
            .then((resposta) => resposta.json())
            .then((equipamentos: Equipamento[]) => {
                console.table(equipamentos);
                setEquipamentos(equipamentos);
            });
    }

    function excluirEquipamento(equipamentoId: number) {
        axios.delete(`http://localhost:5223/equipamentos/deletar/${equipamentoId}`)
            .then((resposta) => {
                setEquipamentos(resposta.data);
            })
            .catch((error) => console.error('Erro ao excluir equipamento:', error));
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
                    {equipamentos.map(equipamento => (
                        <tr key={equipamento.equipamentoId}>
                            <td>{equipamento.equipamentoId}</td>
                            <td>{equipamento.criadoEm ? format(new Date(equipamento.criadoEm), 'dd/MM/yyyy') : 'N/A'}</td>
                            <td>{equipamento.nome}</td>
                            <td>{equipamento.descricao}</td>
                            <td>
                                <button onClick={() => {excluirEquipamento(equipamento.equipamentoId!)}}>Deletar</button>
                                <button><Link to={`/pages/equipamento/alterar/${equipamento.equipamentoId}`}>Alterar</Link></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EquipamentoListar;
