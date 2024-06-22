import React from "react";
import img1 from "../../../assets/img1.png";

function PaginaInicial() {
  return (
    <div className="container">
      <section className="d-flex justify-content-center align-items-center vh-100">
        <div className="w-50 text-center">
          <h2 className="mb-3">Resumo sobre o projeto</h2>
          <p>
            O Sistema de Gerenciamento de Ordem de Serviço (SGOS) é uma solução abrangente projetada para otimizar e simplificar a gestão dos serviços oferecidos pela empresa. 
            Com o SGOS, será possível criar ordens de serviço detalhadas, integrando informações cruciais sobre clientes, produtos, acabamentos, equipamentos e formas de pagamento. 
            O sistema oferece um controle de status em tempo real, permitindo que os usuários monitorem o progresso de cada ordem de serviço. Além disso, o SGOS inclui relatórios gerais abrangentes, incluindo análises financeiras, 
            e uma seção de configuração acessível apenas ao administrador do sistema, para gerenciar o acesso dos funcionários às funcionalidades do sistema.
          </p>
        </div>
        <div className="w-50 d-flex justify-content-center">
          <img src={img1} alt="imagem segurança lateral" className="img-fluid" />
        </div>
      </section>
    </div>
  );
}

export default PaginaInicial;


