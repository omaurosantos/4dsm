import { useEffect, useState } from "react";
import axios from "../services/api";

type LogItem = {
  id: number;
  uid: string | null;
  senha: string | null;
  resultado: string | null;
  tipo: string | null;
  mensagem: string | null;
  datahora: string;
};

export default function AccessLog() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  async function fetchLogs() {
    try {
      const res = await axios.get("/logs");
      // Sort logs by datahora in ascending order
      const sortedLogs = res.data.rows.sort((a: LogItem, b: LogItem) => 
        new Date(a.datahora).getTime() - new Date(b.datahora).getTime()
      );
      setLogs(sortedLogs);
      setError(null);
    } catch (err: any) {
      console.error("Erro ao buscar logs:", err);
      setError("Falha ao carregar os logs. Tente novamente.");
      setLogs([]);
    }
  }

  const getRowClass = (resultado: string | null) => {
    if (resultado === "sucesso") return "bg-green-50 hover:bg-green-100 text-green-700";
    if (resultado === "negado") return "bg-red-50 hover:bg-red-100 text-red-700";
    return "bg-white hover:bg-gray-100 text-gray-700";
  };

  return (
    <div className="w-full max-w-6xl glass-effect p-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8">
        Condomínio Residencial Aurora
      </h1>
      <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6 border-b-2 border-blue-300 pb-2">
        Histórico de Acessos
      </h2>
      {error && (
        <p className="text-red-600 text-center mb-6 bg-red-50 p-4 rounded-lg">{error}</p>
      )}
      <div className="overflow-y-auto max-h-96">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="p-4 border-b-2 border-blue-300 text-left font-semibold">#</th>
              <th className="p-4 border-b-2 border-blue-300 text-left font-semibold">Data/Hora</th>
              <th className="p-4 border-b-2 border-blue-300 text-left font-semibold">UID</th>
              <th className="p-4 border-b-2 border-blue-300 text-left font-semibold">Tipo</th>
              <th className="p-4 border-b-2 border-blue-300 text-left font-semibold">Mensagem</th>
              <th className="p-4 border-b-2 border-blue-300 text-left font-semibold">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <tr
                  key={log.id}
                  className={`border-b transition-all ${getRowClass(log.resultado)}`}
                >
                  <td className="p-4 font-medium">{index + 1}</td>
                  <td className="p-4">{new Date(log.datahora).toLocaleString("pt-BR")}</td>
                  <td className="p-4">{log.uid || "-"}</td>
                  <td className="p-4">{log.tipo || "-"}</td>
                  <td className="p-4 font-medium">{log.mensagem || "-"}</td>
                  <td className="p-4 font-medium">
                    {log.resultado ? log.resultado.charAt(0).toUpperCase() + log.resultado.slice(1) : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-gray-600 p-4">
                  Nenhum acesso registrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}