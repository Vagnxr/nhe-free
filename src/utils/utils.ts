export const isValidPDV = (pontoDeVenda: string): boolean =>
  !pontoDeVenda || /^([0-9]|[A-Z])+([0-9A-Z]+)$/.test(pontoDeVenda);

export const isValidPDVs = (pontosDeVenda: string[]): boolean => pontosDeVenda.every(isValidPDV);
