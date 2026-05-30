
const db = require('../db');

const COLLECTION = 'patients';


function getAll() {
  return db.getAll(COLLECTION);
}


function getById(id) {
  return db.getById(COLLECTION, id);
}


function create(data) {
  return db.create(COLLECTION, data);
}


function update(id, changes) {
  return db.update(COLLECTION, id, changes);
}


function remove(id) {
  return db.remove(COLLECTION, id);
}

module.exports = { getAll, getById, create, update, remove };
