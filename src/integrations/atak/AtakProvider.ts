import {
  PedidoDeVendaTerceirosRequest,
  PedidoDeVendaTerceirosResponse,
} from "./types/PedidoDeVenda.types";

import {
  PedidoDeVendaSapRequest,
  PedidoDeVendaSapResponse,
} from "./types/PedidoDeVendaSap.types";

import { ObterFiliaisResponse } from "./types/Filial.types";
import { ObterProdutoResponse, ObterProdutosResponse } from "./types/Produto.types";

export interface AtakProvider {
  enviarPedidoDeVendaTerceiros(
    payload: PedidoDeVendaTerceirosRequest
  ): Promise<PedidoDeVendaTerceirosResponse>;

  enviarPedidoDeVendaSap(
    payload: PedidoDeVendaSapRequest
  ): Promise<PedidoDeVendaSapResponse>;

  obterFiliais(): Promise<ObterFiliaisResponse>;

  obterProduto(idProduto: string, idReferencia: string): Promise<ObterProdutoResponse>;

  obterProdutos(dataDeAlteracao: string): Promise<ObterProdutosResponse>;
}
