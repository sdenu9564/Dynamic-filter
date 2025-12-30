import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import sequelize from '../config/database.js';
import { Sequelize } from 'sequelize';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const models = {};

const files = fs.readdirSync(__dirname)
  .filter((file) => file.endsWith('.js') && file !== 'index.js' && file !== 'init.js');

for (const file of files) {
  const filePath = path.join(__dirname, file);
  try {
    const module = await import(pathToFileURL(filePath).href); 
    console.log(`✔ Loaded: ${file}`);

    if (typeof module.default !== 'function') {
      console.error(`${file} does not export a default function`);
      continue; // Skip this file if it doesn't export a function
    }

    const model = module.default(sequelize, Sequelize.DataTypes);
    models[model.name] = model;
  } catch (error) {
    console.error(`Error importing model from ${file}:`, error.message);
  }
}

export { sequelize };
export default models;
