import axios from "axios";
import { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { OrdemServico, Status } from "../../../models/OrdemServico";
import { Cliente } from "../../../models/Cliente";
import { Vendedor } from "../../../models/Vendedor";
import { Forma, Pagamento } from "../../../models/Pagamento";

function SolicitarBaixa(){

    const navigate = useNavigate();

    const { ordemServicoId } = useParams();
    const [cliente, setCliente] = useState("");
    const [vendedor, setVendedor] = useState("");

    const [formaPagamentos, setFormaPagamentos] = useState<Pagamento[]>([]);

    const [observacao, setObservacao] = useState("");
    const [pagamento, setPagamento] = useState<Forma>();
    const [valorAPagar, setValorAPagar] = useState(0.0);
    const [valorTotal, setValorTotal] = useState(0.0);
    const [desconto, setDesconto] = useState("");

    const [erro, setErro] = useState("");



    useEffect(() => {
        if(Number.isNaN(Number(ordemServicoId)) || Number(ordemServicoId) < 1){
            navigate("/pages/ordemServico/listar");
        }else{
            carregarInformacoes();
        }
      }, []);

    function carregarInformacoes(){
        axios.get<OrdemServico>(`http://localhost:5223/ordem-servico/buscar/${ordemServicoId}`)
        .then((resposta) => {
            if(resposta.data.status != 2){
                navigate("/pages/ordemServico/listar");
            }

            setValorTotal(resposta.data.valorTotal!);
            setObservacao(resposta.data.observacoes!);

            axios.get(`http://localhost:5223/cliente/buscar/${resposta.data.clienteId}`).then((resposta) =>{
                setCliente(resposta.data.nome);
            });
    
            axios.get(`http://localhost:5223/vendedor/buscar/${resposta.data.vendedorId}`).then((resposta) =>{
                setVendedor(resposta.data.nome);
            });
        })
        .catch((error) => {
            console.error('Erro ao buscar Ordem de serviço:', error)
            navigate("/pages/ordemServico/listar");
        });
    }
    

    function solicitarBaixa(e: any){
        e.preventDefault();

        if(pagamento != Forma.Indefinido){
            axios.post(`http://localhost:5223/solicitar-baixa/${ordemServicoId}`, 
                {
                    valorDesconto: desconto,
                    pagamentos: [
                        {
                            forma: pagamento,
                            valor: valorTotal - Number(desconto),
                            ordemServicoId: ordemServicoId
                        }
                    ]
                }
            ).then(
                () =>{
                    navigate("/pages/ordemServico/listar");
                }
            ).catch((error) => {
                console.error('Erro ao buscar Ordem de serviço:', error)
                setErro("Erro: " + error.response.data);
            });;
        }else{
            setErro("Forma de pagamento não definida");
        }
    }

    return (
        <div className="container w-75" style={{ marginTop: '8rem', backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '0.5rem' }}>
            <div className="row justify-content-center">
                <div className="col-12">
                    <form onSubmit={solicitarBaixa}>
                        <fieldset>
                            <legend className="mb-4 text-center" style={{ color: '#495057', whiteSpace: 'nowrap' }}>Solicitar Baixa da Ordem de Serviço: {ordemServicoId}</legend>

                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Cliente:</label>
                                <input type="text" value={cliente} className="form-control" disabled/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Vendedor:</label>
                                <input type="text" value={vendedor} className="form-control" disabled/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Valor Total:</label>
                                <input type="text" value={"R$ " + valorTotal} className="form-control" disabled/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Forma de Pagamento:</label>
                                <select className="form-select" value={pagamento} onChange={(e: any) => setPagamento(Number(e.target.value))} required>
                                    <option value={Forma.Indefinido} key={-1}>Selecione...</option>
                                    <option value={Forma.Dinheiro} key={0}>
                                        Dinheiro
                                    </option>
                                    <option value={Forma.CartaoCredito} key={1}>
                                        Cartão de Crédito
                                    </option>
                                    <option value={Forma.CartaoDebito} key={2}>
                                        Cartão de Débito
                                    </option>
                                    <option value={Forma.Boleto} key={3}>
                                        Boleto
                                    </option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Desconto:</label>
                                <input type="number" value={desconto} className="form-control" onChange={(e: any) => setDesconto(e.target.value)} required/>
                                
                            </div>

                            <div className="mb-3">
                                <label className="form-label" style={{ color: '#161A26' }}>Valor à Pagar:</label>
                                <input type="text" value={"R$ " + (valorTotal - Number(desconto))} className="form-control" disabled/>
                            </div>

                            <div>{erro}</div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-success mt-3 w-50">Salvar</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default SolicitarBaixa;