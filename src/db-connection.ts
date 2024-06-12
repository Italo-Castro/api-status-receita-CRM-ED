import mysql from "mysql2";
import fs from "fs";
import path from "path";

export const dbConnection = (
  host: string,
  user: string,
  password: string,
  database: string
) => {
  const db = mysql.createConnection({
    host,
    user,
    password,
    database,
  });

  db.connect((err) => {
    if (err) {
      fs.writeFileSync(
        path.join(__dirname, "api-status-receita-log.txt"),
        `Erro ao conectar no banco de dados -> ${err}`
      );
      console.error("Erro ao conectar no banco de dados:", err);
      process.exit(1);
    }
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS status_receita (
            id INT AUTO_INCREMENT PRIMARY KEY,
            servico VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL
        )
    `;

    db.query(createTableQuery, (err) => {
      if (err) {
        fs.writeFileSync(
          path.join(__dirname, "api-status-receita-log.txt"),
          `Erro ao criar a tabela -> ${err}`
        );
        console.error("Erro ao criar a tabela:", err);
        process.exit(1);
      }
    });
  });

  return db;
};
