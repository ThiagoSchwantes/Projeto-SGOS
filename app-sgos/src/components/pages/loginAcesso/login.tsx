import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/loginAcesso/AuthContext';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    function AcessoLogin(e: any) {
        e.preventDefault();

        axios.post("http://localhost:5223/vendedor/validacaoAcesso", { usuario, senha })
            .then((resposta) => {
                login();
                navigate('/pages/loginAcesso/paginaInicial');
            })
            .catch(() => setErro('Erro ao tentar fazer login'));
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{backgroundColor: '#292F3F'}}>
            <div className="w-25 p-4 rounded" style={{backgroundColor: '#394154'}}>
                <form onSubmit={AcessoLogin}>
                    <fieldset>
                        <h2 className="mb-4 text-center" style={{color: '#FCF8F5'}}>Login</h2>
                        <div className="mb-3">
                            <label htmlFor="usuario" className="form-label" style={{color: '#FCF8F5'}}>Usuário:</label>
                            <input 
                                type="text" 
                                id="usuario" 
                                className="form-control bg-input" 
                                value={usuario} 
                                onChange={(e) => setUsuario(e.target.value)} 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="senha" className="form-label" style={{color: '#FCF8F5'}}>Senha:</label>
                            <input 
                                type="password" 
                                id="senha" 
                                className="form-control bg-input" 
                                value={senha} 
                                onChange={(e) => setSenha(e.target.value)} 
                            />
                        </div>
                        {erro && <p className="text-danger">{erro}</p>}
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary w-50">Login</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
    
}

export default Login;
