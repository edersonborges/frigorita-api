// src/constants/pedidoStatus.ts

export const PEDIDO_STATUS = {
  PENDENTE: 0,
  APROVADO: 1,
  REJEITADO: 2,
  CANCELADO: 3, // reservado (se quiser pode renomear depois)
} as const;

export type PedidoStatusCode =
  (typeof PEDIDO_STATUS)[keyof typeof PEDIDO_STATUS];
