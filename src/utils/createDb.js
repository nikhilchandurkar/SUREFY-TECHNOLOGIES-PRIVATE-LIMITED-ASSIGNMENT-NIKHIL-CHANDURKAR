import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

export const createDbIfNotExists = async () => {
  const dbUrl = new URL(process.env.DATABASE_URL);
  const databaseName = dbUrl.pathname.slice(1);

  dbUrl.pathname = '/postgres';

  const client = new Client({ connectionString: dbUrl.toString() });

  try {
    await client.connect();

    const result = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [databaseName]);
    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE "${databaseName}"`);
      console.log(` Database "${databaseName}" created.`);
    } else {
      console.log(` Database "${databaseName}" already exists.`);
    }
  } catch (err) {
    console.error('❌ Failed to create database:', err);
  } finally {
    await client.end();
  }
};
