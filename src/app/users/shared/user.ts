export interface User {
  id: number;
  registration: number;
  name: string;
  nickname: string;
  email: string;
  password: string;
  password_confirmation: string;
  cpf: string;
  landline: string;
  cellphone: string;
  whatsapp: string;
  simple_address: string;
  type: string;
  organization: string;
  role: string;
  address_id: number;
  created_at: Date;
  auth_token: string;
  encrypted_password?: string;
  reset_password_token?: string;
  reset_password_sent_at?: Date;
  sign_in_count?: number;
  current_sign_in_at?: Date;
  last_sign_in_at?: Date;
  current_sign_in_ip?: string;
  last_sign_in_ip?: string;
}
