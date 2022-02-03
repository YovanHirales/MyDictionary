const { Pool } = require('pg');
require('dotenv').config();

const devConfig = {
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	port: process.env.PG_PORT,
};

const proConfig = {
	connectionString:
		'postgres://bujfpbrwuhsxdb:9937a9bb86d6d8ce04f6d50aa72e503749770aff5ec1a97b92833bfa201aeb7a@ec2-3-214-4-239.compute-1.amazonaws.com:5432/dj2p50scmg3le',
}; //heroku address

const pool = new Pool(
	process.env.NODE_ENV === 'production' ? proConfig : devConfig
);

module.exports = pool;
