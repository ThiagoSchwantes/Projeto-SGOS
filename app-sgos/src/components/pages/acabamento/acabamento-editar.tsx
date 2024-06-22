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
    <div className="container w-50" style={{ marginTop: '8rem', backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '0.5rem'  }}>
      <div className="row justify-content-center">
        <div className="col-12">
          <form onSubmit={alterar}>
            <fieldset>
              <legend className="mb-4 text-center" style={{ color: '#495057', whiteSpace: 'nowrap' }}>Alterar acabamento</legend>
              <div className="mb-5">
                  <label className="form-label" style={{ color: '#161A26' }}>Nome:</label>
                  <input type="text" value={nome} className="form-control" onChange={(e: any) => setNome(e.target.value)} required />
                  
              </div>
              <div className="mb-3">
                  <label className="form-label" style={{ color: '#161A26' }}>Descrição:</label>
                  <input type="text" value={descricao} className="form-control" onChange={(e: any) => {setDescricao(e.target.value)}} required />
                  
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

export default AcabamentoEditar;