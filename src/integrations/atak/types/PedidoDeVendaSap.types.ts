export interface PedidoDeVendaSapItem {
  IDDoItem: string;
  IdDaReferencia: string;
  QuantidadePrimaria: number;
  QuantidadeAuxiliar: number;
  ValorUnitario: number;
  QuantidadeComissao: number;
  Observacao: string;
  ValorTotal: number;
  PercDesconto: number;
  ValorDesconto: number;
  ValorLiquido: number;
  ValorFrete: number;
}

export interface PedidoDeVendaSapParcela {
  numeroDaParcela: number;
  dataDaEmissao: string;
  dataDeVencimento: string;
  DataDeVEncimentoUtil: string;
  valor: number;
  percentualDaParcela: number;
  prazo: number;
  idFilial: string;
  bancoCaixa: number;
  natureza: string;
  valorDaMoeda: number;
  quantidadeDeParcelas: number;
  idDoParticipante: number;
  dataDeEmissaoOriginal: string;
  formaCobranca: number;
}

export interface PedidoDeVendaSapRequest {
  IdFilial: string;
  IdCliente: number;
  idVendedor: number;
  idListaDePreco: number;
  idFormaCobranca: number;
  usuario: string;
  dataVenda: string;
  dataEmbarque: string;
  dataEntrega: string;
  dataEmVigor: string;
  tipoMovimento: string;
  condicaoPagamento: string;
  valorDesconto: number;
  total: number;
  observacao: string;
  codControle: string;
  movimentoDestino: string;
  tipoFrete: string;
  valorLiquido: number;
  valorFrete: number;
  itens: PedidoDeVendaSapItem[];
  Parcelas: PedidoDeVendaSapParcela[];
}

// Você vai colar aqui o retorno real depois
export type PedidoDeVendaSapResponse = unknown;
