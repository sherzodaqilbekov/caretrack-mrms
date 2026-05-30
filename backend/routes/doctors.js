
const express  = require("express");
const router   = express.Router();
const db       = require("../db");
const { authenticate, authorize } = require("../middleware/auth");


router.get("/", authenticate, (req, res) => {
  res.json(db.getAll("doctors"));
});


router.get("/:id", authenticate, (req, res) => {
  const doctor = db.getById("doctors", req.params.id);
  if (!doctor) return res.status(404).json({ error: "Shifokor topilmadi" });
  res.json(doctor);
});


router.post("/", authenticate, authorize("admin"), (req, res) => {
  const { fullName, specialty, department, email, phone } = req.body;
  if (!fullName || !specialty) {
    return res.status(400).json({ error: "Ism va mutaxassislik majburiy" });
  }
  const created = db.create("doctors", { fullName, specialty, department, email, phone });
  res.status(201).json(created);
});


router.put("/:id", authenticate, authorize("admin"), (req, res) => {
  const updated = db.update("doctors", req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Shifokor topilmadi" });
  res.json(updated);
});


router.delete("/:id", authenticate, authorize("admin"), (req, res) => {
  const ok = db.remove("doctors", req.params.id);
  if (!ok) return res.status(404).json({ error: "Shifokor topilmadi" });
  res.json({ message: "O'chirildi" });
});

module.exports = router;
