const express = require("express");
const bodyParser = require("body-parser");
const PDFDocument = require("pdfkit");
const cors=require('cors')
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors())
app.post("/generate-pdf", (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).send("No text provided");

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=output.pdf");

  doc.pipe(res);
  doc.fontSize(14).text(text, 100, 100);
  doc.end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
