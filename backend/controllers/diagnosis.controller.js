const Diagnosis = require('../models/diagnosis.model');

function getAll(req, res) {
  res.json(Diagnosis.getAll());
}

function getOne(req, res) {
  const diagnosis = Diagnosis.getById(req.params.id);
  if (!diagnosis) return res.status(404).json({ error: 'Tashxis topilmadi' });
  res.json(diagnosis);
}

function create(req, res) {
  const { icdCode, diseaseName, description, severity, patientId, diagnosedDate } = req.body;

  if (!icdCode || !patientId) {
    return res.status(400).json({ error: 'ICD kodi va bemor majburiy' });
  }
  const created = Diagnosis.create({
    icdCode,
    diseaseName:   diseaseName   || '',
    description:   description   || '',
    severity:      severity      || 'mild',
    patientId:     Number(patientId),
    diagnosedDate: diagnosedDate || '',
  });
  res.status(201).json(created);
}

function update(req, res) {
  const { icdCode, diseaseName, description, severity, patientId, diagnosedDate } = req.body;
  const changes = {
    icdCode,
    diseaseName:   diseaseName   || '',
    description:   description   || '',
    severity:      severity      || 'mild',
    patientId:     Number(patientId),
    diagnosedDate: diagnosedDate || '',
  };
  const updated = Diagnosis.update(req.params.id, changes);
  if (!updated) return res.status(404).json({ error: 'Tashxis topilmadi' });
  res.json(updated);
}

function remove(req, res) {
  const ok = Diagnosis.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Tashxis topilmadi' });
  res.json({ message: "O'chirildi" });
}

module.exports = { getAll, getOne, create, update, remove };
