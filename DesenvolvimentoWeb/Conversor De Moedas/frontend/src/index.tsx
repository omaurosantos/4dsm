import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css"; // Importe um arquivo CSS para estilos

const App: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("BRL");
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async (): Promise<void> => {
      try {
        const response = await fetch("http://localhost:5000/rates");
        if (response.ok) {
          const data = await response.json();
          setRates(data.rates);
        } else {
          setError("Erro ao carregar taxas de câmbio.");
        }
      } catch (error) {
        console.error("Erro ao buscar taxas:", error);
        setError("Erro ao carregar taxas de câmbio.");
      }
    };
    fetchRates();
  }, []);

  const convertCurrency = async (): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:5000/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(`${amount} ${fromCurrency} = ${data.convertedAmount} ${toCurrency}`);
        setError(null);
      }
    } catch (error) {
      console.error("Erro ao converter moeda:", error);
      setError("Erro ao converter moeda.");
    }
  };

  return (
    <div className="container">
      <h1>Conversor de Moedas</h1>
      <div className="input-group">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {Object.keys(rates).length > 0 ? (
            Object.keys(rates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Carregando moedas...
            </option>
          )}
        </select>
        <span> para </span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {Object.keys(rates).length > 0 ? (
            Object.keys(rates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Carregando moedas...
            </option>
          )}
        </select>
      </div>
      <button onClick={convertCurrency}>Converter</button>
      {result && <h2>{result}</h2>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App key="app-root" />
  </React.StrictMode>
);

export default App;
