import { AtakProvider } from "../AtakProvider";
import { PedidoDeVendaTerceirosRequest } from "../types/PedidoDeVenda.types";
import { PedidoDeVendaSapRequest } from "../types/PedidoDeVendaSap.types";

export class MockAtakProvider implements AtakProvider {
  async enviarPedidoDeVendaTerceiros(payload: PedidoDeVendaTerceirosRequest) {
    // MOCK: substitua pelo retorno real quando você enviar
    return {
      ok: true,
      origem: "mock",
      endpoint: "integracaoterceiros/PedidoDeVenda",
      recebido: payload,
      // exemplo de campos comuns:
      idIntegracao: "mock-001",
      mensagem: "Pedido recebido (mock)",
    };
  }

  async enviarPedidoDeVendaSap(payload: PedidoDeVendaSapRequest) {
    // MOCK: substitua pelo retorno real quando você enviar
    return {
      ok: true,
      origem: "mock",
      endpoint: "IntegracaoSAP/PedidoDeVenda",
      recebido: payload,
      idIntegracao: "mock-002",
      mensagem: "Pedido SAP recebido (mock)",
    };
  }

  async obterFiliais() {
    // MOCK: substitua pelo retorno real quando você enviar
    return {
      ok: true,
      origem: "mock",
      endpoint: "integracaoterceiros/Filial/ObterTodos",
      data: [
        { idFilial: "100", nome: "Filial Mock 100" },
        { idFilial: "200", nome: "Filial Mock 200" },
      ],
    };
  }

  async obterProduto(idProduto: string, idReferencia: string) {
    // MOCK: substitua pelo retorno real quando você enviar
    return {
      ok: true,
      origem: "mock",
      endpoint: `integracaoterceiros/ObterProduto/${idProduto}/${idReferencia}`,
      data: {
        idProduto,
        idReferencia,
        descricao: "Produto Mock",
        preco: 10,
        ativo: true,
      },
    };
  }

  async obterProdutos(dataDeAlteracao: string) {
    // MOCK: substitua pelo retorno real quando você enviar
    return {
      ok: true,
      origem: "mock",
      endpoint: `integracaoterceiros/ObterProdutos?dataDeAlteracao=${dataDeAlteracao}`,
      data: [
        { idProduto: "3044", descricao: "Produto Mock 3044", atualizadoEm: dataDeAlteracao },
      ],
    };
  }
}
