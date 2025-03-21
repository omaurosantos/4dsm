// src/hooks/useCep.ts
import { useContext } from "react";
import { CepContext } from "../contexts/CepContext";
import { fetchCep } from "../services/viaCepservice";

export const useCep = () => {
  const { cep, setCep, cepData, setCepData, consultedCeps, addConsultedCep } = useContext(CepContext);

  const getCepData = async () => {
    try {
      if (cep.length === 8) {
        const data = await fetchCep(cep);
        setCepData(data);
        // Adiciona ao histórico se for válido
        if (data && !data.erro) {
          addConsultedCep(data);
        }
      } else {
        alert("Digite um CEP válido com 8 dígitos!");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao consultar o CEP. Tente novamente.");
      setCepData(null);
    }
  };

  return { cep, setCep, cepData, getCepData, consultedCeps };
};