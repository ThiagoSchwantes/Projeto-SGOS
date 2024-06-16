import { useEffect, useState } from 'react';
import { Vendedor } from '../../../models/Vendedor';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function VendedorEditar() {
    const navigate = useNavigate();
    const { vendedorId } = useParams<{ vendedorId: string }>();
    const [nome, setNome] = useState("");
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    useEffect(() => {
        if (vendedorId) {
          axios.get<Vendedor>(`http://localhost:5223/vendedor/buscar/${vendedorId}`)
            .then((resposta) => {
                setNome(resposta.data.nome);
                setUsuario(resposta.data.usuario);
                setSenha(resposta.data.senha);
            })
            .catch((error) => console.error('Erro ao buscar o vendedor:', error));
        }
      }, []);

    function alterar(e: any) {
        e.preventDefault();

        const vendedorAtualizado: Vendedor = {
            nome: nome,
            usuario: usuario,
            senha: senha,
        };

        fetch(`http://localhost:5223/vendedores/alterar/${vendedorId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vendedorAtualizado)
        })
            .then((resposta) => resposta.json())
            .then((vendedor: Vendedor) => {
                console.log('Vendedor atualizado com sucesso', vendedor);
                navigate("/pages/vendedor/listar");
            })
            .catch((error) => console.error('Erro ao atualizar vendedor:', error));
    }

    return (
        <div>
            <h2>Alterar Vendedor</h2>
            <form onSubmit={alterar}>
                <label>
                    Nome:
                    <input type="text" value={nome} onChange={(e: any) => setNome(e.target.value)} required />
                </label>
                <label>
                    Usuário:
                    <input type="text" value={usuario} onChange={(e: any) => setUsuario(e.target.value)} required />
                </label>
                <label>
                    Senha:
                    <input type="password" value={senha} onChange={(e: any) => setSenha(e.target.value)} required />
                </label>
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default VendedorEditar;
