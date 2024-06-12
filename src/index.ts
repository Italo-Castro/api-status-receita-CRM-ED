import express from "express";
import { dbConnection } from "./db-connection";
import apiStatusReceita from "./api-status-receita";
import fs from "fs";
import path from "path";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

const [, , host, user, password, database] = process.argv;

if (!host || !user || !password || !database) {
  console.error(
    "Por favor, forneça os parâmetros de conexão com o banco de dados: host user password database"
  );
  process.exit(1);
}

const db = dbConnection(host, user, password, database);

app.get("/", (req, res) => {
  res.send("API está funcionando!");
});

app.listen(port, async () => {
  try {
    await apiStatusReceita.verificarStatus(db);
  } catch (erro: any) {
    fs.writeFileSync(
      path.join(__dirname, "api-status-receita-log.txt"),
      `Erro ao consumir api status-receita -> ${erro}`
    );
  }
});
