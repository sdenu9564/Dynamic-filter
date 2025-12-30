import * as dotenv from 'dotenv';

dotenv.config();



const configObj = {
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  DB_DOMAIN: process.env.DB_DOMAIN,
  ALLOWED_DOMAIN: process.env.DASHBOARD_APP_ORIGIN,
};

const defaultConfig = {
  PORT: process.env.PORT || 9000,
};

export default {
  ...defaultConfig,
  ...configObj
};
