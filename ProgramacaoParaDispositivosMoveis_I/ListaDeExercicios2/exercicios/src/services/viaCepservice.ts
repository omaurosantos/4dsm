// src/services/viaCepService.ts
import axios from "axios";
import { CepData } from "../types";

const viaCepApi = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

export const fetchCep = async (cep: string): Promise<CepData> => {
  try {
    const response = await viaCepApi.get<CepData>(`${cep}/json/`);
    if (response.data && "cep" in response.data) { // Verifica se é uma resposta válida
      return response.data;
    } else {
      throw new Error("CEP inválido ou não encontrado");
    }
  } catch (error) {
    // Verifica se é um erro HTTP (como 400) sem depender de isAxiosError
    if (error instanceof Error && "response" in error && (error as any).response?.status === 400) {
      throw new Error("CEP inválido (Erro 400)");
    }
    throw error; // Propaga outros erros (ex.: falha de rede)
  }
};