export type TBalance = {
  id?: string;
  user_email?: string;
  balance: number;
};

export interface ITopUp {
  top_up_amount: number | string;
  email?: string;
}
