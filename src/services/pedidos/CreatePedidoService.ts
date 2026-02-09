import prismaClient from "../../prisma";
import { PEDIDO_STATUS } from "../../constants/pedidoStatus";

interface PedidoItemInput {
  IDDoItem: string;
  IdDaReferencia: string;
  QuantidadePrimaria: number;
  QuantidadeAuxiliar: number;
  ValorUnitario: number;
  QuantidadeComissao: number;
  Observacao?: string;
  ValorTotal: number;
  PercDesconto: number;
  ValorDesconto: number;
  ValorLiquido: number;
  ValorFrete: number;
}

interface PedidoParcelaInput {
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

export interface CreatePedidoInput {
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
  observacao?: string;
  codControle: string;
  movimentoDestino?: string;
  tipoFrete?: string;
  valorLiquido: number;
  valorFrete: number;

  itens: PedidoItemInput[];
  Parcelas: PedidoParcelaInput[];
}

function parseBooleanEnv(value?: string): boolean {
  // TRUE / true / 1 / yes / y / on => true
  return ["true", "1", "yes", "y", "on"].includes((value ?? "").trim().toLowerCase());
}

class CreatePedidoService {
  async execute(input: CreatePedidoInput) {
    try {
      if (!input?.codControle) return "codControle é obrigatório.";
      if (!input?.IdFilial) return "IdFilial é obrigatório.";
      if (!input?.usuario) return "usuario é obrigatório.";
      if (!input?.itens?.length) return "É necessário enviar ao menos 1 item.";
      if (!input?.Parcelas?.length) return "É necessário enviar ao menos 1 parcela.";

      const exists = await prismaClient.pedido.findUnique({
        where: { codControle: input.codControle },
        select: { id: true },
      });
      if (exists) return "Já existe um pedido com esse codControle.";

      // ✅ Regra de aprovação via env:
      // APROVACAO_PEDIDO=TRUE  => status PENDENTE (0)
      // APROVACAO_PEDIDO=FALSE => status APROVADO (1)
      const aprovacaoAtiva = parseBooleanEnv(process.env.APROVACAO_PEDIDO);
      const statusInicial = aprovacaoAtiva ? PEDIDO_STATUS.PENDENTE : PEDIDO_STATUS.APROVADO;

      const pedido = await prismaClient.pedido.create({
        data: {
          IdFilial: input.IdFilial,
          IdCliente: input.IdCliente,
          idVendedor: input.idVendedor,
          idListaDePreco: input.idListaDePreco,
          idFormaCobranca: input.idFormaCobranca,
          usuario: input.usuario,

          dataVenda: new Date(input.dataVenda),
          dataEmbarque: new Date(input.dataEmbarque),
          dataEntrega: new Date(input.dataEntrega),
          dataEmVigor: new Date(input.dataEmVigor),

          tipoMovimento: input.tipoMovimento,
          condicaoPagamento: input.condicaoPagamento,

          valorDesconto: input.valorDesconto,
          total: input.total,
          valorLiquido: input.valorLiquido,
          valorFrete: input.valorFrete,

          observacao: input.observacao,
          codControle: input.codControle,
          movimentoDestino: input.movimentoDestino,
          tipoFrete: input.tipoFrete,

          status: statusInicial,

          itens: {
            create: input.itens.map((i) => ({
              IDDoItem: i.IDDoItem,
              IdDaReferencia: i.IdDaReferencia,
              QuantidadePrimaria: i.QuantidadePrimaria,
              QuantidadeAuxiliar: i.QuantidadeAuxiliar,
              ValorUnitario: i.ValorUnitario,
              QuantidadeComissao: i.QuantidadeComissao,
              Observacao: i.Observacao,
              ValorTotal: i.ValorTotal,
              PercDesconto: i.PercDesconto,
              ValorDesconto: i.ValorDesconto,
              ValorLiquido: i.ValorLiquido,
              ValorFrete: i.ValorFrete,
            })),
          },

          parcelas: {
            create: input.Parcelas.map((p) => ({
              numeroDaParcela: p.numeroDaParcela,
              dataDaEmissao: new Date(p.dataDaEmissao),
              dataDeVencimento: new Date(p.dataDeVencimento),
              DataDeVEncimentoUtil: new Date(p.DataDeVEncimentoUtil),
              valor: p.valor,
              percentualDaParcela: p.percentualDaParcela,
              prazo: p.prazo,
              idFilial: p.idFilial,
              bancoCaixa: p.bancoCaixa,
              natureza: p.natureza,
              valorDaMoeda: p.valorDaMoeda,
              quantidadeDeParcelas: p.quantidadeDeParcelas,
              idDoParticipante: p.idDoParticipante,
              dataDeEmissaoOriginal: new Date(p.dataDeEmissaoOriginal),
              formaCobranca: p.formaCobranca,
            })),
          },
        },
        select: {
          id: true,
          codControle: true,
          status: true,
          createdAt: true,
          itens: { select: { id: true } },
          parcelas: { select: { id: true } },
        },
      });

      return { message: "Pedido cadastrado com sucesso", pedido };
    } catch (error: any) {
      console.error("Error in CreatePedidoService:", error);
      return "Falha ao cadastrar pedido";
    }
  }
}

export { CreatePedidoService };
