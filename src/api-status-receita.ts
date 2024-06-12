import axios from "axios";
import { ResStatusReceitaAPi, StatusReceita } from "./entities/StatusReceita";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import fs from "fs";
import path from "path";

class apiStatusReceita {
  async verificarStatus(connectionDB: Connection) {
    try {
      const apiKey = process.env.API_KEY;

      const res = await axios.get<ResStatusReceitaAPi[]>(
        "https://ndkdhopudhzarfdgpeos.supabase.co/rest/v1/apis",
        {
          headers: {
            apiKey,
          },
        }
      );
      const data = res.data;
      inserirInformacoesBD(data, connectionDB);
      return data;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
}

const inserirInformacoesBD = (
  status: ResStatusReceitaAPi[],
  connectionDB: Connection
) => {
  const values = status
    .map((item) => `(${item.id}, '${item.name}', '${item.status}')`)
    .join(",");

  const query = `INSERT INTO status_receita (id, servico, status) VALUES ${values}  
  ON DUPLICATE KEY UPDATE
    servico = VALUES(servico),
    status = VALUES(status)`;

  connectionDB.query(query, (err) => {
    if (err) {
      fs.writeFileSync(
        path.join(__dirname, "api-status-receita-log.txt"),
        `Erro ao inserir dados no banco de dados -> ${err}`
      );
      console.error("Erro ao inserir dados:", err);
    } else {
    }
  });
};

export default new apiStatusReceita();
