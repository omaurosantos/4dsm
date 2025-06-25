import express, { Request, Response, RequestHandler } from "express";
import { Pool } from "pg";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Configurações da porta e host
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const HOST: string = '0.0.0.0';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do banco PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'condominio',
  password: process.env.DB_PASSWORD || 'AFO123381',
  port: parseInt(process.env.DB_PORT || "5432"),
});

// Teste de conexão com o banco
pool.connect()
  .then(() => {
    console.log("✅ Conexão com o banco estabelecida");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar com o banco:", err.message);
  });

// Rota POST /log
const logHandler: RequestHandler = async (req: Request, res: Response) => {
  try {
    console.log("📥 Corpo recebido:", req.body);

    const { uid, tipo, mensagem, valor } = req.body;

    const result = await pool.query(
      'INSERT INTO acessos (uid, tipo, mensagem) VALUES ($1, $2, $3) RETURNING *',
      [uid || null, tipo, mensagem || valor || null]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("❌ Erro ao inserir no banco:", error);
    res.status(500).json({ success: false, error: 'Erro interno no servidor' });
  }
};

app.post('/log', logHandler);

// Rota GET /logs
const getLogsHandler: RequestHandler = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM acessos ORDER BY datahora DESC');
    res.status(200).json({ success: true, rows: result.rows });
  } catch (error) {
    console.error("❌ Erro ao buscar logs:", error);
    res.status(500).json({ success: false, error: 'Erro interno no servidor' });
  }
};

app.get('/logs', getLogsHandler);

// Inicia o servidor
app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor rodando em http://${HOST}:${PORT}`);
});