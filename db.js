const { Client } = require('pg');
require('dotenv').config();

const devConfig = {
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	port: process.env.PG_PORT,
};

const proConfig = process.env.DATABASE_URL;

const client = new Client({
	connectionString:
		process.env.NODE_ENV === 'production' ? proConfig : devConfig,
	ssl: {
		rejectUnauthorized: false,
	},
});

module.exports = client;
