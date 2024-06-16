import { useEffect, useState } from 'react';
import { Equipamento } from '../../../models/Equipamento';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function EquipamentoEditar() {
  const navigate = useNavigate();
  const { equipamentoId } = useParams<{ equipamentoId: string }>();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (equipamentoId) {
      axios.get<Equipamento>(`http://localhost:5223/equipamento/buscar/${equipamentoId}`)
        .then((resposta) => {
          setNome(resposta.data.nome);
          setDescricao(resposta.data.descricao);
        })
        .catch((error) => console.error('Erro ao buscar o equipamento:', error));
    }
  }, []);

  function alterar(e: any) {
    e.preventDefault();

    const equipamentoAtualizado: Equipamento = {
      nome: nome,
      descricao: descricao,
    };

    fetch(`http://localhost:5223/equipamentos/alterar/${equipamentoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(equipamentoAtualizado)
    })
      .then((resposta) => resposta.json())
      .then((equipamento: Equipamento) => {
        console.log('Equipamento atualizado com sucesso', equipamento);
        navigate("/pages/equipamento/listar");
      })
      .catch((error) => console.error('Erro ao atualizar equipamento:', error));
  }

  return (
    <div>
      <h2>Alterar Equipamento</h2>
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

export default EquipamentoEditar;
