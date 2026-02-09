-- CreateTable
CREATE TABLE "pedido" (
    "_id" TEXT NOT NULL,
    "IdFilial" TEXT NOT NULL,
    "IdCliente" INTEGER NOT NULL,
    "idVendedor" INTEGER NOT NULL,
    "idListaDePreco" INTEGER NOT NULL,
    "idFormaCobranca" INTEGER NOT NULL,
    "usuario" TEXT NOT NULL,
    "dataVenda" TIMESTAMP(3) NOT NULL,
    "dataEmbarque" TIMESTAMP(3) NOT NULL,
    "dataEntrega" TIMESTAMP(3) NOT NULL,
    "dataEmVigor" TIMESTAMP(3) NOT NULL,
    "tipoMovimento" TEXT NOT NULL,
    "condicaoPagamento" TEXT NOT NULL,
    "valorDesconto" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "valorLiquido" DOUBLE PRECISION NOT NULL,
    "valorFrete" DOUBLE PRECISION NOT NULL,
    "observacao" TEXT,
    "codControle" TEXT NOT NULL,
    "movimentoDestino" TEXT,
    "tipoFrete" TEXT,
    "status" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "pedido_item" (
    "_id" TEXT NOT NULL,
    "IDDoItem" TEXT NOT NULL,
    "IdDaReferencia" TEXT NOT NULL,
    "QuantidadePrimaria" DOUBLE PRECISION NOT NULL,
    "QuantidadeAuxiliar" DOUBLE PRECISION NOT NULL,
    "ValorUnitario" DOUBLE PRECISION NOT NULL,
    "QuantidadeComissao" DOUBLE PRECISION NOT NULL,
    "Observacao" TEXT,
    "ValorTotal" DOUBLE PRECISION NOT NULL,
    "PercDesconto" DOUBLE PRECISION NOT NULL,
    "ValorDesconto" DOUBLE PRECISION NOT NULL,
    "ValorLiquido" DOUBLE PRECISION NOT NULL,
    "ValorFrete" DOUBLE PRECISION NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "pedido_item_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "pedido_parcela" (
    "_id" TEXT NOT NULL,
    "numeroDaParcela" INTEGER NOT NULL,
    "dataDaEmissao" TIMESTAMP(3) NOT NULL,
    "dataDeVencimento" TIMESTAMP(3) NOT NULL,
    "DataDeVEncimentoUtil" TIMESTAMP(3) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "percentualDaParcela" DOUBLE PRECISION NOT NULL,
    "prazo" INTEGER NOT NULL,
    "idFilial" TEXT NOT NULL,
    "bancoCaixa" INTEGER NOT NULL,
    "natureza" TEXT NOT NULL,
    "valorDaMoeda" DOUBLE PRECISION NOT NULL,
    "quantidadeDeParcelas" INTEGER NOT NULL,
    "idDoParticipante" INTEGER NOT NULL,
    "dataDeEmissaoOriginal" TIMESTAMP(3) NOT NULL,
    "formaCobranca" INTEGER NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "pedido_parcela_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pedido_codControle_key" ON "pedido"("codControle");

-- AddForeignKey
ALTER TABLE "pedido_item" ADD CONSTRAINT "pedido_item_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedido"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_parcela" ADD CONSTRAINT "pedido_parcela_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedido"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
