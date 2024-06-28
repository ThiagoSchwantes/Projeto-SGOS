import { useEffect, useState } from "react";
import { Cliente } from "../../../models/Cliente";
import { Vendedor } from "../../../models/Vendedor";
import { Equipamento } from "../../../models/Equipamento";
import { Acabamento } from "../../../models/Acabamento";
import { OrdemServico } from "../../../models/OrdemServico";
import { Produto } from "../../../models/Produto";
import { useNavigate } from "react-router-dom";

function CriarOs() {
    const navigate = useNavigate();
    const [observacao, setObservacao] = useState("");
    const [clienteId, setClienteId] = useState(0);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [vendedorId, setVendedorId] = useState(0);
    const [vendedores, setVendedores] = useState<Vendedor[]>([]);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [largura, setLargura] = useState(0.0);
    const [altura, setAltura] = useState(0.0);
    const [valorM2, setValorM2] = useState(0.0);
    const [quantidade, setQuantidade] = useState(0);
    const [equipamentoId, setEquipamentoId] = useState(0);
    const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
    const [acabamentoId, setAcabamentoId] = useState(0);
    const [acabamentos, setAcabamentos] = useState<Acabamento[]>([]);

    useEffect(() => {
        carregarClientes();
        carregarVendedores();
        carregarEquipamentos();
        carregarAcabamentos();
      }, []);

    function carregarClientes() {
      //FETCH ou AXIOS
      fetch("http://localhost:5223/clientes/listar")
        .then((resposta) => resposta.json())
        .then((clientes: Cliente[]) => {
            setClientes(clientes);
        });
    }
    function carregarVendedores() {
        //FETCH ou AXIOS
        fetch("http://localhost:5223/vendedores/listar")
          .then((resposta) => resposta.json())
          .then((vendedores: Vendedor[]) => {
            setVendedores(vendedores);
          });
    }
    function carregarEquipamentos() {
        //FETCH ou AXIOS
        fetch("http://localhost:5223/equipamentos/listar")
          .then((resposta) => resposta.json())
          .then((equipamentos: Equipamento[]) => {
            setEquipamentos(equipamentos);
          });
    }
    function carregarAcabamentos() {
        //FETCH ou AXIOS
        fetch("http://localhost:5223/acabamentos/listar")
          .then((resposta) => resposta.json())
          .then((acabamentos: Acabamento[]) => {
            setAcabamentos(acabamentos);
          });
    }

    function cadastrar(e: any) {
        e.preventDefault();

        const novaOrdemServico: OrdemServico = {
            observacoes: observacao,
            clienteId: clienteId,
            vendedorId: vendedorId
        };

        const listaOrdemServico = [novaOrdemServico]

        fetch("http://localhost:5223/ordem-servico/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(listaOrdemServico),
        })
        .then((resposta) => resposta.json())
        .then((data) => {
            const ordemServicoId = data.ordemServicoId;

            const novoProduto: Produto = {
                nome: nome,
                descricao: descricao,
                largura: largura,
                altura: altura,
                valorM2: valorM2,
                quantidade: quantidade,
                equipamentoId: equipamentoId,
                acabamentoId: acabamentoId,
                ordemServicoId: ordemServicoId
            };

            const listaProduto = [novoProduto]

            fetch("http://localhost:5223/produtos/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(listaProduto),
            })
            .then((resposta) => resposta.json())
            .then(() => {
                navigate("/pages/acabamento/listar");
            });
        })
        .catch((error) => {
            console.error("Erro ao cadastrar a ordem de serviço:", error);
        });
    };

    return (
        <div className="container w-75" style={{ marginTop: '8rem', backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '0.5rem' }}>
            <div className="row justify-content-center">
                <div className="col-12">
                    <form onSubmit={cadastrar}>
                        <fieldset>
                            <legend className="mb-4 text-center" style={{ color: '#495057', whiteSpace: 'nowrap' }}>Criar Ordem de Serviço</legend>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Observação:</label>
                                <input type="text" value={observacao} className="form-control" onChange={(e) => setObservacao(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Cliente:</label>
                                <select className="form-select" onChange={(e: any) => setClienteId(Number(e.target.value))}>
                                    {clientes.map((cliente) => (
                                        <option value={cliente.clienteId} key={cliente.clienteId}>
                                            {cliente.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Vendedor:</label>
                                <select className="form-select" onChange={(e: any) => setVendedorId(Number(e.target.value))}>
                                    {vendedores.map((vendedor) => (
                                        <option value={vendedor.vendedorId} key={vendedor.vendedorId}>
                                            {vendedor.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Produto:</label>
                                <input type="text" value={nome} className="form-control" onChange={(e) => setNome(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Descrição:</label>
                                <input type="text" value={descricao} className="form-control" onChange={(e) => setDescricao(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Largura:</label>
                                <input type="number" value={largura} className="form-control" onChange={(e) => setLargura(Number(e.target.value))} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Altura:</label>
                                <input type="number" value={altura} className="form-control" onChange={(e) => setAltura(Number(e.target.value))} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Valor M2:</label>
                                <input type="number" value={valorM2} className="form-control" onChange={(e) => setValorM2(Number(e.target.value))} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Quantidade:</label>
                                <input type="number" value={quantidade} className="form-control" onChange={(e) => setQuantidade(Number(e.target.value))} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Equipamento:</label>
                                <select className="form-select" onChange={(e: any) => setEquipamentoId(Number(e.target.value))}>
                                    {equipamentos.map((equipamento) => (
                                        <option value={equipamento.equipamentoId} key={equipamento.equipamentoId}>
                                            {equipamento.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Acabamento:</label>
                                <select className="form-select" onChange={(e: any) => setAcabamentoId(Number(e.target.value))}>
                                    {acabamentos.map((acabamento) => (
                                        <option value={acabamento.acabamentoId} key={acabamento.acabamentoId}>
                                            {acabamento.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success mt-3 w-50">salvar</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
    
}

export default CriarOs;
