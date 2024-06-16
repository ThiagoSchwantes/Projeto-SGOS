import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Vendedor } from '../../../models/Vendedor';

function VendedorCadastrar() {
    const navigate = useNavigate();
    const [nome, setNome] = useState<string>('');
    const [usuario, setUsuario] = useState<string>('');
    const [senha, setSenha] = useState<string>('');

    function cadastrar(e: React.FormEvent) {
        e.preventDefault();

        const novoVendedor: Vendedor = {
            nome: nome,
            usuario: usuario,
            senha: senha,
        };
        const listaVendedor = [novoVendedor];

        fetch("http://localhost:5223/vendedores/cadastrar", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listaVendedor)
        })
            .then((resposta) => resposta.json())
            .then((resposta) => {
                navigate("/pages/vendedor/listar")
            })
    }

    return (
        <div className="container w-50" style={{ marginTop: '8rem', backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '0.5rem'  }}>
            <div className="row justify-content-center">
                <div className="col-12">
                    <form onSubmit={cadastrar}>
                        <fieldset>
                            <legend className="mb-4 text-center" style={{ color: '#495057', whiteSpace: 'nowrap' }}>Cadastrar Vendedor</legend>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Nome:</label>
                                <input type="text" value={nome} className="form-control" onChange={(e: any) => setNome(e.target.value)} required />
                                
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Usuário::</label>
                                <input type="text" value={usuario} className="form-control" onChange={(e: any) => setUsuario(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Senha:</label>
                                <input type="password" value={senha} className="form-control" onChange={(e: any) => setSenha(e.target.value)} required />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success mt-3 w-50">Cadastrar</button>
                            </div>
                            
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default VendedorCadastrar;
