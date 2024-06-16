import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Equipamento } from '../../../models/Equipamento';

function EquipamentoCadastrar() {
    const navigate = useNavigate();
    const [nome, setNome] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');

    function cadastrar(e: any){
        e.preventDefault();

        const novoEquipamento : Equipamento = {
            nome: nome,
            descricao: descricao,
            criadoEm: new Date() 
        };
        const listaEquipamento = [novoEquipamento];

        fetch("http://localhost:5223/equipamentos/cadastrar",
            {
                method : "POST",
                headers : {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(listaEquipamento)
            })
                .then((resposta) => resposta.json())
                .then((resposta) => {
                    navigate("/pages/equipamento/listar");
                });
    };
    
    return (
        <div className="container w-50" style={{ marginTop: '8rem', backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '0.5rem'  }}>
            <div className="row justify-content-center">
                <div className="col-12">
                    <form onSubmit={cadastrar}>
                        <fieldset>
                            <legend className="mb-4 text-center" style={{ color: '#495057', whiteSpace: 'nowrap' }}>Cadastrar Equipamento</legend>
                            <div className="mb-5">
                                <label className="form-label" style={{ color: '#161A26' }}>Nome:</label>
                                <input type="text" value={nome} className="form-control" onChange={(e: any) => setNome(e.target.value)} required />
                            </div>
                            <div className="mb-5">
                                <label className="form-label" style={{ color: '#161A26' }}>Descrição:</label>
                                <input type="text" value={descricao} className="form-control" onChange={(e: any) => setDescricao(e.target.value)} required />
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

export default EquipamentoCadastrar;
