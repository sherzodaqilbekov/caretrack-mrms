
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "db.json");


function readDB() {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}


function getAll(collection) {
  const db = readDB();
  return db[collection];
}


function getById(collection, id) {
  const db = readDB();
  return db[collection].find((item) => item.id === Number(id));
}


function create(collection, item) {
  const db = readDB();
  const list = db[collection];
  
  const newId = list.length ? Math.max(...list.map((x) => x.id)) + 1 : 1;
  const newItem = { id: newId, ...item };
  list.push(newItem);
  writeDB(db);
  return newItem;
}


function update(collection, id, changes) {
  const db = readDB();
  const list = db[collection];
  const index = list.findIndex((item) => item.id === Number(id));
  if (index === -1) return null;
  list[index] = { ...list[index], ...changes, id: Number(id) };
  writeDB(db);
  return list[index];
}


function remove(collection, id) {
  const db = readDB();
  const list = db[collection];
  const index = list.findIndex((item) => item.id === Number(id));
  if (index === -1) return false;
  list.splice(index, 1);
  writeDB(db);
  return true;
}

module.exports = { readDB, writeDB, getAll, getById, create, update, remove };
