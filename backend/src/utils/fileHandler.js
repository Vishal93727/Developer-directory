const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/developers.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
};

// Read developers from JSON file
const readDevelopers = async () => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // File doesn't exist, create it with empty array
      await writeDevelopers([]);
      return [];
    }
    throw err;
  }
};

// Write developers to JSON file
const writeDevelopers = async (developers) => {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(developers, null, 2), 'utf8');
};

// Generate unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

module.exports = {
  readDevelopers,
  writeDevelopers,
  generateId
};