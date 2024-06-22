import { useEffect, useState } from "react";
import { Vendedor } from "../../../models/Vendedor";
import { format } from 'date-fns';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function VendedorListar() {
    const [vendedores, setVendedores] = useState<Vendedor[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        carregarVendedores();
    }, []);

    function carregarVendedores() {
        fetch("http://localhost:5223/vendedores/listar")
            .then((resposta) => resposta.json())
            .then((vendedores: Vendedor[]) => {
                console.table(vendedores);
                setVendedores(vendedores);
            });
    }

    function excluirVendedor(vendedorId: number) {

        axios.delete(`http://localhost:5223/vendedores/deletar/${vendedorId}`)
            .then((resposta) => {
                setVendedores(resposta.data);
            })
            .catch((error) => console.error('Erro ao excluir vendedor:', error));
    }

    return (
        <div className="d-flex vh-100">
            <div className="container my-auto text-center">
            <h2>Lista de Vendedores</h2>
                <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover mt-2">
                <thead>
                    <tr>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Código</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Nome</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Usuário</th>
                        <th style={{backgroundColor: '#3C3B6F', color: 'white'}}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {vendedores.map(vendedor => (
                        <tr key={vendedor.vendedorId}>
                            <td>{vendedor.vendedorId}</td>
                            <td>{vendedor.nome}</td>
                            <td>{vendedor.usuario}</td>
                            <td>
                                <div className="btn-group" role="group">
                                    <button className="btn mr-2" style={{backgroundColor: 'red', color: 'white'}} onClick={() => {excluirVendedor(vendedor.vendedorId!)}}>Deletar</button>
                                    <Link to={`/pages/vendedor/alterar/${vendedor.vendedorId}`} className="btn" style={{backgroundColor: '#39F700', color: 'black'}}>Alterar</Link>
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

export default VendedorListar;
