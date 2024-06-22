import { useEffect, useState } from 'react';
import { Cliente } from '../../../models/Cliente';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function ClienteEditar() {
  const navigate = useNavigate();
  const { clienteId } = useParams<{ clienteId: string }>();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    if (clienteId) {
      axios.get<Cliente>(`http://localhost:5223/cliente/buscar/${clienteId}`)
        .then((resposta) => {
          setNome(resposta.data.nome);
          setCpf(resposta.data.cpf);
          setRg(resposta.data.rg);
          setCep(resposta.data.cep);
          setEndereco(resposta.data.endereco);
          setBairro(resposta.data.bairro);
          setCidade(resposta.data.cidade);
          setTelefone(resposta.data.telefone);
        })
        .catch((error) => console.error('Erro ao buscar o cliente:', error));
    }
  }, []);

  function salvar(e: any) {
    e.preventDefault();

    const clienteAtualizado: Cliente = {
      nome: nome,
      cpf: cpf,
      rg: rg,
      cep: cep,
      endereco: endereco,
      bairro: bairro,
      cidade: cidade,
      telefone: telefone,
    };

    fetch(`http://localhost:5223/clientes/alterar/${clienteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clienteAtualizado)
    })
      .then((resposta) => resposta.json())
      .then((cliente: Cliente) => {
        console.log('Cliente atualizado com sucesso', cliente);
        navigate("/pages/cliente/listar");
      })
  }

  return (
    <div className="container w-75" style={{ marginTop: '4rem', backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '0.5rem'  }}>
      <div className="row justify-content-center">
        <div className="col-12">
          <form onSubmit={salvar}>
            <fieldset>
              <legend className="mb-4 text-center" style={{ color: '#495057', whiteSpace: 'nowrap' }}>Alterar Cliente</legend>
              <div className="mb-2">
                <label className="form-label" style={{ color: '#161A26' }}>Nome:</label>
                <input type="text" value={nome} className="form-control" onChange={(e: any) => setNome(e.target.value)} required />
              </div>
              <div className="mb-2 row">
                <div className="col-md-6">
                  <label className="form-label" style={{ color: '#161A26' }}>CPF:</label>
                  <input type="text" value={cpf} className="form-control" onChange={(e: any) => setCpf(e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label" style={{ color: '#161A26' }}>R.G:</label>
                  <input type="text" value={rg} className="form-control" onChange={(e: any) => setRg(e.target.value)} required />
                </div>
              </div>
              
              <div className="mb-2">
                <label className="form-label" style={{ color: '#161A26' }}>Endereço:</label>
                <input type="text" value={endereco} className="form-control" onChange={(e: any) => setEndereco(e.target.value)} required />
              </div>

              <div className="mb-2 row">
                <div className="col-md-6">
                  <label className="form-label" style={{ color: '#161A26' }}>Bairro:</label>
                  <input type="text" value={bairro} className="form-control" onChange={(e: any) => setBairro(e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label" style={{ color: '#161A26' }}>Cidade:</label>
                  <input type="text" value={cidade} className="form-control" onChange={(e: any) => setCidade(e.target.value)} required />
                </div>
              </div>

              <div className="mb-2 row">
                <div className="col-md-6">
                  <label className="form-label" style={{ color: '#161A26' }}>CEP:</label>
                  <input type="text" value={cep} className="form-control" onChange={(e: any) => setCep(e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label" style={{ color: '#161A26' }}>Telefone:</label>
                  <input type="text" value={telefone} className="form-control" onChange={(e: any) => setTelefone(e.target.value)} required />
                </div>
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

export default ClienteEditar;