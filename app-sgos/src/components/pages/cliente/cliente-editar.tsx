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
    <div>
      <h2>Alterar Cliente</h2>
      <form onSubmit={salvar}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e: any) => setNome(e.target.value)} required />
        </label>
        <label>
          CPF:
          <input type="text" value={cpf} onChange={(e: any) => setCpf(e.target.value)} required />
        </label>
        <label>
          R.G:
          <input type="text" value={rg} onChange={(e: any) => setRg(e.target.value)} required />
        </label>
        <label>
          CEP:
          <input type="text" value={cep} onChange={(e: any) => setCep(e.target.value)} required />
        </label>
        <label>
          Endereço:
          <input type="text" value={endereco} onChange={(e: any) => setEndereco(e.target.value)} required />
        </label>
        <label>
          Bairro:
          <input type="text" value={bairro} onChange={(e: any) => setBairro(e.target.value)} required />
        </label>
        <label>
          Cidade:
          <input type="text" value={cidade} onChange={(e: any) => setCidade(e.target.value)} required />
        </label>
        <label>
          Telefone:
          <input type="text" value={telefone} onChange={(e: any) => setTelefone(e.target.value)} required />
        </label>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default ClienteEditar;