const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const adminAuth = require('../middleware/adminAuth');
const { Parser } = require('json2csv');

// Protected: list registrations
router.get('/registrations', adminAuth, async (req, res) => {
  try {
    const { export: exportCsv } = req.query;
    const regs = await Registration.find().sort({ createdAt: -1 }).lean();
    if (exportCsv === 'csv') {
      const fields = ['_id','fullName','studentId','email','phone','faculty','studyProgram','year','interests','status','createdAt'];
      const parser = new Parser({ fields });
      const csv = parser.parse(regs);
      res.header('Content-Type', 'text/csv');
      res.attachment('registrations.csv');
      return res.send(csv);
    }
    return res.json(regs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Approve
router.put('/registrations/:id/approve', adminAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const reg = await Registration.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
    if (!reg) return res.status(404).json({ message: 'Not found' });
    return res.json({ message: 'Approved', registration: reg });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

