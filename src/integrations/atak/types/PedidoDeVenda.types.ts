export interface PedidoDeVendaTerceirosRequest {
  IdFilial: string;
  IdCliente: number;
  idVendedor: number;
  IdCadastroRetirada: number;
  idListaDePreco: number;
  idFormaCobranca: number;
  usuario: string;
  dataVenda: string; // ISO
  tipoMovimento: string;
  valorDesconto: number;
  total: number;
  valorLiquido: number;
  codControle: string; // uuid
}

// Você vai colar aqui o retorno real depois
export type PedidoDeVendaTerceirosResponse = unknown;
