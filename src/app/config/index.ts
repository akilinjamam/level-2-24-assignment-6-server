import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  default_password: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  node_mailer_user_id: process.env.NODE_MAILER_USER_ID,
  node_mailer_password: process.env.NODE_MAILER_PASSWORD,
  recovery_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  smtp_user: process.env.SMTP_USER,
  smtp_pass: process.env.SMTP_PASS,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret_key: process.env.API_SECRET_KEY,
  payment_api_key: process.env.PAYMENT_API_ENDPOINT,
  store_id: process.env.STOR_ID,
  signature_key: process.env.SIGNATURE_KEY,
};
