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
        <div>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Usuário</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {vendedores.map(vendedor => (
                        <tr key={vendedor.vendedorId}>
                            <td>{vendedor.vendedorId}</td>
                            <td>{vendedor.nome}</td>
                            <td>{vendedor.usuario}</td>
                            <td>
                                <button onClick={() => {excluirVendedor(vendedor.vendedorId!)}}>Deletar</button>
                                <button><Link to={`/pages/vendedor/alterar/${vendedor.vendedorId}`}>Alterar</Link></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VendedorListar;
