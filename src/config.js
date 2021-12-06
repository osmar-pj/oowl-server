import { config } from "dotenv";
config();

export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/owl-db",
  PORT: process.env.PORT || 3005,
  SECRET: 'winex'
};
