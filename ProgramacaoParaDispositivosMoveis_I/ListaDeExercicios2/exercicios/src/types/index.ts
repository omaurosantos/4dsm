// src/types/index.ts
export type RootStackParamList = {
  Quatro2: undefined; // Corrigido para "Quatro2"
};

export interface CepData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: string;
}