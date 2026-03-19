import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import { initSchema } from './schema.js';

const isTest = process.env.NODE_ENV === 'test';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultDbPath = path.resolve(__dirname, 'database.sqlite');
const configuredDbPath = process.env.DB_PATH;
const dbPath = isTest
    ? ':memory:'
    : configuredDbPath
        ? path.resolve(process.cwd(), configuredDbPath)
        : defaultDbPath;

if (dbPath !== ':memory:') {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

initSchema(db);

export default db;