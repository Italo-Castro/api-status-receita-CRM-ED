export class StatusReceita {
  id!: number;
  servico!: string;
  status!: string;
}

export type ResStatusReceitaAPi = {
  id: number;
  name: string;
  created_at: string;
  url: string;
  status: string;
};
