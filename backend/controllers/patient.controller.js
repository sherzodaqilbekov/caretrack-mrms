
const Patient   = require('../models/patient.model');
const Diagnosis = require('../models/diagnosis.model');
const db        = require('../db'); // shifokorni id orqali olish uchun


function getAll(req, res) {
  res.json(Patient.getAll());
}

function getOne(req, res) {
  const patient = Patient.getById(req.params.id);
  if (!patient) return res.status(404).json({ error: 'Bemor topilmadi' });
  res.json(patient);
}

function create(req, res) {
  const { fullName, dateOfBirth, gender, address, phone, doctorId } = req.body;
  if (!fullName || !doctorId) {
    return res.status(400).json({ error: 'Ism va shifokor majburiy' });
  }
  const created = Patient.create({
    fullName,
    dateOfBirth: dateOfBirth || '',
    gender:      gender      || '',
    address:     address     || '',
    phone:       phone       || '',
    doctorId:    Number(doctorId),
  });
  res.status(201).json(created);
}


function update(req, res) {
  const { fullName, dateOfBirth, gender, address, phone, doctorId } = req.body;
  const changes = {
    fullName,
    dateOfBirth: dateOfBirth || '',
    gender:      gender      || '',
    address:     address     || '',
    phone:       phone       || '',
    doctorId:    Number(doctorId),
  };
  const updated = Patient.update(req.params.id, changes);
  if (!updated) return res.status(404).json({ error: 'Bemor topilmadi' });
  res.json(updated);
}


function getPatientProfile(req, res) {

  const patient = Patient.getById(req.params.id);
  if (!patient) return res.status(404).json({ error: 'Bemor topilmadi' });


  const doctor = db.getById('doctors', patient.doctorId) || null;


  const diagnoses = Diagnosis.getAll().filter(
    (d) => d.patientId === patient.id
  );


  res.json({ patient, doctor, diagnoses });
}

function remove(req, res) {
  const ok = Patient.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Bemor topilmadi' });
  res.json({ message: "O'chirildi" });
}

module.exports = { getAll, getOne, getPatientProfile, create, update, remove };
