import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Cliente } from "../../../models/Cliente";

function ClienteCadastrar() {
  const navigate = useNavigate();
  const [nome, setNome] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [rg, setRg] = useState<string>('');
  const [cep, setCep] = useState<string>('');
  const [endereco, setEndereco] = useState<string>('');
  const [bairro, setBairro] = useState<string>('');
  const [cidade, setCidade] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');

  function cadastrar(e: any) {
    e.preventDefault();

    const novoCliente : Cliente = {
      nome: nome,
      cpf: cpf,
      rg: rg,
      cep: cep,
      endereco: endereco,
      bairro: bairro,
      cidade: cidade,
      telefone: telefone,
    };

    const listaClientes = [novoCliente];


    fetch('http://localhost:5223/clientes/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(listaClientes)
    })
      .then((resposta) => resposta.json())
      .then((resposta) => {
        navigate("/pages/cliente/listar");
      })
      .catch((error) => console.error('Erro ao cadastrar cliente:', error));
  }

  return (
    <div className="container w-50" style={{ marginTop: '8rem', backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '0.5rem'  }}>
      <div className="row justify-content-center">
        <div className="col-12">
          <form onSubmit={cadastrar}>
            <fieldset>
              <legend className="mb-4 text-center" style={{ color: '#495057', whiteSpace: 'nowrap' }}>Cadastrar Cliente</legend>
              <div className="mb-2">
                <label className="form-label" style={{ color: '#161A26' }}>Nome:</label>
                <input type="text" value={nome} className="form-control" onChange={(e: any) => setNome(e.target.value)} required />
              </div>
              <div className="mb-2">
                <label className="form-label" style={{ color: '#161A26' }}>CPF:</label>
                <input type="text" value={cpf} className="form-control" onChange={(e: any) => setCpf(e.target.value)} required />
              </div>
              <div className="mb-2">
                <label className="form-label" style={{ color: '#161A26' }}>R.G:</label>
                <input type="text" value={rg} className="form-control" onChange={(e: any) => setRg(e.target.value)} required />
              </div>
              <div className="mb-2">
                <label className="form-label" style={{ color: '#161A26' }}>CEP:</label>
                <input type="text" value={cep} className="form-control" onChange={(e: any) => setCep(e.target.value)} required />
              </div>
              <div className="mb-2">
                <label className="form-label" style={{ color: '#161A26' }}>Endereço:</label>
                <input type="text" value={endereco} className="form-control" onChange={(e: any) => setEndereco(e.target.value)} required />
              </div>
              <div className="mb-2">
                <label className="form-label" style={{ color: '#161A26' }}>Bairro:</label>
                <input type="text" value={bairro} className="form-control" onChange={(e: any) => setBairro(e.target.value)} required />
              </div>
              <div className="mb-2">
                <label className="form-label" style={{ color: '#161A26' }}>Cidade:</label>
                <input type="text" value={cidade} className="form-control" onChange={(e: any) => setCidade(e.target.value)} required />
              </div>
              <div className="mb-2">
                <label className="form-label" style={{ color: '#161A26' }}>Telefone:</label>
                <input type="text" value={telefone} className="form-control" onChange={(e: any) => setTelefone(e.target.value)} required />
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

export default ClienteCadastrar;

