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
        <div className="d-flex vh-100">
            <div className="container my-auto text-center">
            <h2>Lista de Clientes</h2>
                <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover mt-2">
                <thead>
                    <tr className="table">
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Código</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Criado Em</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Nome</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>CPF</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>RG</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>CEP</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Endereço</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Bairro</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Cidade</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Telefone</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Ações</th>
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
                                <div className="btn-group" role="group">
                                    <button className="btn mr-2" style={{backgroundColor: 'red', color: 'white'}} onClick={() => {excluirCliente(cliente.clienteId!)}}>Deletar</button>
                                    <Link to={`/pages/cliente/alterar/${cliente.clienteId}`} className="btn" style={{backgroundColor: '#39F700', color: 'black'}}>Alterar</Link>
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

export default ClienteListar;
