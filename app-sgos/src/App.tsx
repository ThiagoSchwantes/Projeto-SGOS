// src/App.js
// npm install @types/react-router-dom
import React from "react";
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { AuthProvider, useAuth } from './components/pages/loginAcesso/AuthContext';
import PrivateRoute from './components/pages/loginAcesso/PrivateRoute';
import ClienteCadastrar from './components/pages/cliente/cliente-cadastrar';
import AcabamentoCadastrar from "./components/pages/acabamento/acabamento-cadastrar";
import EquipamentoCadastrar from "./components/pages/equipamento/equipamento-cadastrar";
import VendedorCadastrar from "./components/pages/vendedor/vendedor-cadastrar";

import ClienteListar from './components/pages/cliente/cliente-listar';
import AcabamentoListar from './components/pages/acabamento/acabamento-listar';
import EquipamentoListar from './components/pages/equipamento/equipamento-listar';
import VendedorListar from './components/pages/vendedor/vendedor-listar';

import ClienteEditar from './components/pages/cliente/cliente-editar';
import AcabamentoEditar from "./components/pages/acabamento/acabamento-editar";
import EquipamentoEditar from "./components/pages/equipamento/equipamento-editar";
import VendedorEditar from "./components/pages/vendedor/vendedor-editar";

import Login from './components/pages/loginAcesso/login';
import PaginaInicial from "./components/pages/loginAcesso/paginaInicial";
import CriarOs from "./components/pages/ordemServico/os-criar";
import ListarOS from "./components/pages/ordemServico/listagem-os";
import AlterarOS from "./components/pages/ordemServico/alterar-os";

function Navbar() {
    const { isAuthenticated, logout } = useAuth();

    return isAuthenticated ? (
        <nav className="navbar bg-body-tertiary fixed-top">
            <div className="container-fluid" style={{ backgroundColor: '#546BB1' }}>
                <a className="navbar-brand" style={{ color: '#fff' }} href="#">Sistema de Gerenciamento de Ordem de Serviço</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-body border border-black">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu de Cadastro</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Clientes
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/pages/cliente/cadastrar">Cadastrar Cliente</Link></li>
                                    <li><Link className="dropdown-item" to="/pages/cliente/listar">Listar Cliente</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Acabamentos
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/pages/acabamento/cadastrar">Cadastrar Acabamento</Link></li>
                                    <li><Link className="dropdown-item" to="/pages/acabamento/listar">Listar Acabamento</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Equipamentos
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/pages/equipamento/cadastrar">Cadastrar Equipamento</Link></li>
                                    <li><Link className="dropdown-item" to="/pages/equipamento/listar">Listar Equipamento</Link></li>
                                </ul>
                            </li>
                            
                        </ul>
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu de Cadastro</h5>
                        </div>
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Ordem de Serviço
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/pages/ordemServico/cadastrar">Cadastrar Ordem de Serviço</Link></li>
                                    <li><Link className="dropdown-item" to="/pages/ordemServico/listar">Listar  Ordem de Serviço</Link></li>
                                </ul>
                                
                            </li>
                        </ul>
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu de Configuração</h5>
                        </div>
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Vendedores
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/pages/vendedor/cadastrar">Cadastrar Vendedor</Link></li>
                                    <li><Link className="dropdown-item" to="/pages/vendedor/listar">Listar Vendedor</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Baixa de Ordem de Serviço
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="pages/ordemServico/baixar">Baixar Ordem de Serviço</Link></li>
                                    
                                </ul>
                                
                            </li>
                        </ul>
                        {/* <button className="btn btn-danger" onClick={logout}>Logout</button> */}
                    </div>
                </div>
            </div>
        </nav>
    ) : null;
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthProvider>
                    <Navbar />
                    <Routes>
                        <Route path='/pages/login' element={<Login />}></Route>
                        <Route path='/' element={<Login />}></Route>
                        <Route path='/pages/loginAcesso/paginaInicial' element={<PrivateRoute><PaginaInicial /></PrivateRoute>}></Route>
                        <Route path='/pages/cliente/cadastrar' element={<PrivateRoute><ClienteCadastrar /></PrivateRoute>}></Route>
                        <Route path='/pages/cliente/listar' element={<PrivateRoute><ClienteListar /></PrivateRoute>}></Route>
                        <Route path='/pages/cliente/alterar/:clienteId' element={<PrivateRoute><ClienteEditar /></PrivateRoute>}></Route>

                        <Route path='/pages/acabamento/cadastrar' element={<PrivateRoute><AcabamentoCadastrar /></PrivateRoute>}></Route>
                        <Route path='/pages/acabamento/listar' element={<PrivateRoute><AcabamentoListar /></PrivateRoute>}></Route>
                        <Route path='/pages/acabamento/alterar/:acabamentoId' element={<PrivateRoute><AcabamentoEditar /></PrivateRoute>}></Route>

                        <Route path='/pages/equipamento/cadastrar' element={<PrivateRoute><EquipamentoCadastrar /></PrivateRoute>}></Route>
                        <Route path='/pages/equipamento/listar' element={<PrivateRoute><EquipamentoListar /></PrivateRoute>}></Route>
                        <Route path='/pages/equipamento/alterar/:equipamentoId' element={<PrivateRoute><EquipamentoEditar /></PrivateRoute>}></Route>

                        <Route path='/pages/vendedor/cadastrar' element={<PrivateRoute><VendedorCadastrar /></PrivateRoute>}></Route>
                        <Route path='/pages/vendedor/listar' element={<PrivateRoute><VendedorListar /></PrivateRoute>}></Route>
                        <Route path='/pages/vendedor/alterar/:vendedorId' element={<PrivateRoute><VendedorEditar /></PrivateRoute>}></Route>

                        <Route path='/pages/ordemServico/cadastrar' element={<PrivateRoute><CriarOs/></PrivateRoute>}></Route>
                        <Route path='/pages/ordemServico/listar' element={<PrivateRoute><ListarOS/></PrivateRoute>}></Route> 
                        <Route path='/pages/ordemServico/alterar/:ordemServicoId' element={<PrivateRoute><AlterarOS /></PrivateRoute>}></Route>

                        
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;

