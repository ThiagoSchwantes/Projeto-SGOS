import React from "react";
import './App.css';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import ClienteCadastrar from './components/pages/cliente/cliente-cadastrar';
import AcabamentoCadastrar from "./components/pages/acabamento/acabamento-cadastrar";
import EquipamentoCadastrar from "./components/pages/equipamento/equipamento-cadastrar.";
import VendedorCadastrar from "./components/pages/vendedor/vendedor-cadastrar";

import ClienteListar from './components/pages/cliente/cliente-listar';
import AcabamentoListar from './components/pages/acabamento/acabamento-listar';
import EquipamentoListar from './components/pages/equipamento/equipamento-listar';
import VendedorListar from './components/pages/vendedor/vendedor-listar';

import ClienteEditar from './components/pages/cliente/cliente-editar';
import AcabamentoEditar from "./components/pages/acabamento/acabamento-editar";
import EquipamentoEditar from "./components/pages/equipamento/equipamento-editar";
import VendedorEditar from "./components/pages/vendedor/vendedor-editar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar bg-body-tertiary fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Sistema de Gerenciamento de Ordem de Serviço</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
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
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Vendedores
                    </a>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/pages/vendedor/cadastrar">Cadastrar Vendedor</Link></li>
                      <li><Link className="dropdown-item" to="/pages/vendedor/listar">Listar Vendedor</Link></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path='/pages/cliente/cadastrar' element={<ClienteCadastrar/>}></Route>
          <Route path='/pages/cliente/listar' element={<ClienteListar/>}></Route>
          <Route path='/pages/cliente/alterar/:clienteId' element={<ClienteEditar/>}></Route>

          <Route path='/pages/acabamento/cadastrar' element={<AcabamentoCadastrar/>}></Route>
          <Route path='/pages/acabamento/listar' element={<AcabamentoListar/>}></Route>
          <Route path='/pages/acabamento/alterar/:acabamentoId' element={<AcabamentoEditar/>}></Route>
          
          <Route path='/pages/equipamento/cadastrar' element={<EquipamentoCadastrar/>}></Route>
          <Route path='/pages/equipamento/listar' element={<EquipamentoListar/>}></Route>
          <Route path='/pages/equipamento/alterar/:equipamentoId' element={<EquipamentoEditar/>}></Route>

          <Route path='/pages/vendedor/cadastrar' element={<VendedorCadastrar/>}></Route>
          <Route path='/pages/vendedor/listar' element={<VendedorListar/>}></Route>
          <Route path='/pages/vendedor/alterar/:vendedorId' element={<VendedorEditar/>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

