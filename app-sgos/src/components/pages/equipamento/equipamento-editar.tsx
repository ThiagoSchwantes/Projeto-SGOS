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
    <div className="container w-50" style={{ marginTop: '8rem', backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '0.5rem'  }}>
            <div className="row justify-content-center">
                <div className="col-12">
                    <form onSubmit={alterar}>
                        <fieldset>
                            <legend className="mb-4 text-center" style={{ color: '#495057', whiteSpace: 'nowrap' }}>Alterar Equipamento</legend>
                            <div className="mb-5">
                                <label className="form-label" style={{ color: '#161A26' }}>Nome:</label>
                                <input type="text" value={nome} className="form-control" onChange={(e: any) => setNome(e.target.value)} required />
                            </div>
                            <div className="mb-5">
                                <label className="form-label" style={{ color: '#161A26' }}>Descrição:</label>
                                <input type="text" value={descricao} className="form-control" onChange={(e: any) => setDescricao(e.target.value)} required />
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

export default EquipamentoEditar;
