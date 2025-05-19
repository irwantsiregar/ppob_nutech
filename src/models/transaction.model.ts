export type TServiceCode = {
  service_code: string;
};

export interface ITransaction {
  id?: string;
  service_code: string;
  service_name: string;
  total_amount: number;
  user_email?: string;
  invoice_number?: string;
  transaction_type?: string;
  created_on?: string;
}
