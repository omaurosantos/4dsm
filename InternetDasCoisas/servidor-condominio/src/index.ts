// src/index.ts
import express, { Request, Response, RequestHandler } from "express";
import { Pool } from "pg";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Configurações de porta e host com tipos corretos
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const HOST: string = process.env.HOST || 'localhost';

app.use(cors());

// Middleware para suportar JSON e urlencoded (formulários)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Banco de dados PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'condominio',
  password: '1234',
  port: 5432,
});

// Rota POST /log
const logHandler: RequestHandler = async (req: Request, res: Response) => {
  try {
    // Verifique o corpo recebido
    console.log("Corpo recebido:", req.body);

    const { uid, tipo, mensagem, valor } = req.body;

    // Montar os valores para inserir, cuidando dos campos opcionais
    // Como no seu .ino você envia 'tipo' e 'uid' ou 'tipo' e 'valor' (senha)
    // Ajuste para o seu banco aceitar essas variações

    const result = await pool.query(
      'INSERT INTO acessos (uid, tipo, mensagem) VALUES ($1, $2, $3) RETURNING *',
      [uid || null, tipo, mensagem || valor || null]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Erro ao inserir no banco:", error);
    res.status(500).json({ success: false, error: 'Erro interno no servidor' });
  }
};

app.post('/log', logHandler);

app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
