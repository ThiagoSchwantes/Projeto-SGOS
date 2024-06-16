import { useEffect, useState } from "react";
import { Cliente } from "../../../models/Cliente";
import { format } from 'date-fns';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ClienteListar() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        carregarClientes();
    }, []);

    function carregarClientes() {
        fetch("http://localhost:5223/clientes/listar")
            .then((resposta) => resposta.json())
            .then((clientes: Cliente[]) => {
                console.table(clientes);
                setClientes(clientes);
            });
    }

    function excluirCliente(clienteId: number) {
        axios.delete(`http://localhost:5223/clientes/deletar/${clienteId}`)
            .then((resposta) => {
                setClientes(resposta.data);
            })
            .catch((error) => console.error('Erro ao excluir cliente:', error));
    }

    return (
        <div>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Cadastrado Em</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>RG</th>
                        <th>CEP</th>
                        <th>Endereço</th>
                        <th>Bairro</th>
                        <th>Cidade</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.clienteId}>
                            <td>{cliente.clienteId}</td>
                            <td>{cliente.dataCadastro ? format(new Date(cliente.dataCadastro), 'dd/MM/yyyy') : 'N/A'}</td>
                            <td>{cliente.nome}</td>
                            <td>{cliente.cpf}</td>
                            <td>{cliente.rg}</td>
                            <td>{cliente.cep}</td>
                            <td>{cliente.endereco}</td>
                            <td>{cliente.bairro}</td>
                            <td>{cliente.cidade}</td>
                            <td>{cliente.telefone}</td>
                            <td>
                                <button onClick={() => {excluirCliente(cliente.clienteId!)}}>Deletar</button>
                                <button><Link to={`/pages/cliente/alterar/${cliente.clienteId}`}>Alterar</Link></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClienteListar;
