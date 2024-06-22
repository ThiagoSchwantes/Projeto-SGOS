import { useEffect, useState } from 'react';
import { Vendedor } from '../../../models/Vendedor';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function VendedorEditar() {
    const navigate = useNavigate();
    const { vendedorId } = useParams<{ vendedorId: string }>();
    const [nome, setNome] = useState<string>("");
    const [usuario, setUsuario] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    useEffect(() => {
        if (vendedorId) {
          axios.get<Vendedor>(`http://localhost:5223/vendedor/buscar/${vendedorId}`)
            .then((resposta) => {
                setNome(resposta.data.nome ?? "");
                setUsuario(resposta.data.usuario ?? "");
                setSenha(resposta.data.senha ?? "");
            })
            .catch((error) => console.error('Erro ao buscar o vendedor:', error));
        }
      }, [vendedorId]);

    function alterar(e: React.FormEvent<HTMLFormElement>) {
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
        <div className="container w-50" style={{ marginTop: '8rem', backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '0.5rem'  }}>
            <div className="row justify-content-center">
                <div className="col-12">
                    <form onSubmit={alterar}>
                        <fieldset>
                            <legend className="mb-4 text-center" style={{ color: '#495057', whiteSpace: 'nowrap' }}>Alterar Vendedor</legend>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Nome:</label>
                                <input type="text" value={nome} className="form-control" onChange={(e) => setNome(e.target.value)} required />
                                
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Usuário:</label>
                                <input type="text" value={usuario} className="form-control" onChange={(e) => setUsuario(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Senha:</label>
                                <input type="password" value={senha} className="form-control" onChange={(e) => setSenha(e.target.value)} required />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success mt-3 w-50">Salvar Alterações</button>
                            </div>
                            
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default VendedorEditar;

