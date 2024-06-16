import { useEffect, useState } from 'react';
import { Acabamento } from '../../../models/Acabamento';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function AcabamentoEditar() {
  const navigate = useNavigate();
  const { acabamentoId } = useParams<{ acabamentoId: string }>();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (acabamentoId) {
      axios.get<Acabamento>(`http://localhost:5223/acabamento/buscar/${acabamentoId}`)
        .then((resposta) => {
          setNome(resposta.data.nome);
          setDescricao(resposta.data.descricao);
        })
        .catch((error) => console.error('Erro ao buscar o acabamento:', error));
    }
  }, []);

  function alterar(e: any) {
    e.preventDefault();

    const acabamentoAtualizado: Acabamento = {
      nome: nome,
      descricao: descricao,
    };

    fetch(`http://localhost:5223/acabamentos/alterar/${acabamentoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(acabamentoAtualizado)
    })
      .then((resposta) => resposta.json())
      .then((acabamento: Acabamento) => {
        console.log('Acabamento atualizado com sucesso', acabamento);
        navigate("/pages/acabamento/listar");
      })
      .catch((error) => console.error('Erro ao atualizar acabamento:', error));
  }

  return (
    <div>
      <h2>Alterar acabamento</h2>
      <form onSubmit={alterar}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e: any) => setNome(e.target.value)} required />
        </label>
        <label>
          Descrição:
          <input type="text" value={descricao} onChange={(e: any) => setDescricao(e.target.value)} required />
        </label>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default AcabamentoEditar;