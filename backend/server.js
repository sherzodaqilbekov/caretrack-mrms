const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api/auth",      require("./routes/auth.routes"));
app.use("/api/doctors",   require("./routes/doctors"));
app.use("/api/patients",  require("./routes/patient.routes"));
app.use("/api/diagnoses", require("./routes/diagnosis.routes"));
app.use("/api/users",     require("./routes/user.routes"));
app.use("/api/icd",       require("./routes/icd.routes"));

app.listen(PORT, () => {
  console.log(`Server ishlayapti: http://localhost:${PORT}`);
});
