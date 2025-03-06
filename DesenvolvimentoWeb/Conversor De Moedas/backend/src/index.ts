import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

// Endpoint para obter todas as moedas e suas taxas
app.get("/rates", async (req, res) => {
  try {
    const baseCurrency = "USD"; // Moeda base para pegar as taxas
    const response = await axios.get(`${API_URL}${baseCurrency}`);

    // Enviar todas as moedas com suas taxas
    res.json({
      base: baseCurrency,
      rates: response.data.rates,
    });
  } catch (error) {
    console.error("Erro ao obter taxas de câmbio:", error);
    res.status(500).json({ error: "Erro ao buscar taxas de câmbio" });
  }
});

// Endpoint para conversão de moedas
app.get("/convert", async (req, res) => {
  try {
    const getQueryParam = (param: any): string | null => {
      if (Array.isArray(param)) {
        return param.length > 0 ? String(param[0]) : null;
      }
      if (typeof param === "string") {
        return param;
      }
      return null;
    };

    const from = getQueryParam(req.query.from);
    const to = getQueryParam(req.query.to);
    const amount = getQueryParam(req.query.amount);

    if (!from || !to || !amount) {
      return res.status(400).json({ error: "Parâmetros inválidos" });
    }

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      return res.status(400).json({ error: "Valor de conversão inválido" });
    }

    const response = await axios.get(`${API_URL}${encodeURIComponent(from)}`);
    const rate = response.data.rates[to];

    if (!rate) {
      return res.status(400).json({ error: "Moeda não encontrada" });
    }

    const convertedAmount = (amountNumber * rate).toFixed(2);
    res.json({ convertedAmount, rate });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar taxa de câmbio" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
