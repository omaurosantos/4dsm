// src/contexts/CepContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { CepData } from "../types";

interface CepContextProps {
  cep: string;
  setCep: (cep: string) => void;
  cepData: CepData | null;
  setCepData: (data: CepData | null) => void;
  consultedCeps: CepData[]; // Histórico de CEPs consultados
  addConsultedCep: (cepData: CepData) => void; // Função para adicionar CEPs
}

export const CepContext = createContext<CepContextProps>({
  cep: "",
  setCep: () => {},
  cepData: null,
  setCepData: () => {},
  consultedCeps: [],
  addConsultedCep: () => {},
});

export const CepProvider = ({ children }: { children: ReactNode }) => {
  const [cep, setCep] = useState<string>("");
  const [cepData, setCepData] = useState<CepData | null>(null);
  const [consultedCeps, setConsultedCeps] = useState<CepData[]>([]);

  const addConsultedCep = (cepData: CepData) => {
    // Adiciona apenas CEPs válidos (sem erro) e evita duplicatas
    if (cepData && !cepData.erro && !consultedCeps.some((c) => c.cep === cepData.cep)) {
      setConsultedCeps((prev) => [...prev, cepData]);
    }
  };

  return (
    <CepContext.Provider value={{ cep, setCep, cepData, setCepData, consultedCeps, addConsultedCep }}>
      {children}
    </CepContext.Provider>
  );
};